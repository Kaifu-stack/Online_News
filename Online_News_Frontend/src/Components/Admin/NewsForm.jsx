import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaTimes, FaUpload } from 'react-icons/fa';
import { newsService } from '../Service/newsService';
import { toast } from 'react-toastify';

const NewsForm = ({ isEdit = false }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    //  FIX: Categories must match your MongoDB enums
    const categories = ["Politics", "Business", "Technology", "Sports", "Entertainment", "Health"];

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            excerpt: "",
            category: "Technology",
            image: "",
            tags: "",
        },

        validationSchema: Yup.object({
            title: Yup.string().min(10, "Title too short").required("Title is required"),
            content: Yup.string().min(50, "Content too short").required("Content is required"),
            category: Yup.string().required("Category is required"),
        }),

        onSubmit: async (values) => {
            console.log("🟦 SUBMIT VALUES:", values);

            setLoading(true);

            const sendData = {
                ...values,
                tags: values.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t.length > 0),
            };

            const result = isEdit
                ? await newsService.updateNews(id, sendData)
                : await newsService.createNews(sendData);

            setLoading(false);

            if (result.success) {
                toast.success(isEdit ? "Updated successfully" : "Published successfully");
                navigate("/admin/news");
            } else {
                toast.error(result.message || "Failed to save news");
            }
        },
    });

    /** LOAD NEWS FOR EDIT **/
    useEffect(() => {
        if (isEdit) loadNewsData();
    }, [id]);

    const loadNewsData = async () => {
        const res = await newsService.getNewsById(id);

        if (res.success) {
            const news = res.data;

            formik.setValues({
                title: news.title || "",
                content: news.content || "",
                excerpt: news.excerpt || "",
                category: news.category || "Technology",
                image: news.image || "",
                tags: news.tags ? news.tags.join(", ") : "",
            });

            setImagePreview(news.image);
        }
    };

    /** UPLOAD IMAGE **/
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        const upload = await newsService.uploadImage(file);
        setUploadingImage(false);

        if (upload.success) {
            formik.setFieldValue("image", upload.data.url);
            setImagePreview(upload.data.url);
        } else {
            toast.error("Image upload failed");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-card p-8">

                <h1 className="text-3xl font-bold mb-6">
                    {isEdit ? "Edit News" : "Create News"}
                </h1>

                <form onSubmit={formik.handleSubmit} className="space-y-6">

                    {/* TITLE */}
                    <div>
                        <label className="text-sm font-medium">Title *</label>
                        <input
                            {...formik.getFieldProps("title")}
                            className="input-field"
                            placeholder="Enter title"
                        />
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-red-500 text-sm">{formik.errors.title}</p>
                        )}
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className="text-sm font-medium">Category *</label>
                        <select
                            {...formik.getFieldProps("category")}
                            className="input-field"
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* IMAGE */}
                    <div>
                        <label className="text-sm font-medium">Featured Image</label>

                        {imagePreview && (
                            <div className="relative">
                                <img src={imagePreview} className="w-full h-64 object-cover rounded-lg" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        formik.setFieldValue("image", "");
                                    }}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        )}

                        <label className="block mt-3 cursor-pointer border-dashed border-2 p-4 rounded-lg">
                            <input type="file" className="hidden" onChange={handleImageUpload} />
                            <div className="flex items-center">
                                <FaUpload className="mr-2" />
                                {uploadingImage ? "Uploading..." : "Upload Image"}
                            </div>
                        </label>

                        <input
                            {...formik.getFieldProps("image")}
                            className="input-field mt-3"
                            placeholder="or paste image URL"
                        />
                    </div>

                    {/* EXCERPT */}
                    <div>
                        <label className="text-sm font-medium">Excerpt</label>
                        <textarea
                            {...formik.getFieldProps("excerpt")}
                            className="input-field"
                            rows="3"
                        />
                    </div>

                    {/* CONTENT */}
                    <div>
                        <label className="text-sm font-medium">Content *</label>
                        <textarea
                            {...formik.getFieldProps("content")}
                            className="input-field"
                            rows="10"
                        />
                        {formik.touched.content && formik.errors.content && (
                            <p className="text-red-500 text-sm">{formik.errors.content}</p>
                        )}
                    </div>

                    {/* TAGS */}
                    <div>
                        <label className="text-sm font-medium">Tags</label>
                        <input
                            {...formik.getFieldProps("tags")}
                            className="input-field"
                            placeholder="tag1, tag2"
                        />
                    </div>

                    {/* ACTION */}
                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/news")}
                            className="px-6 py-2 border rounded-lg"
                        >
                            Cancel
                        </button>

                        <button type="submit" className="btn-primary flex items-center space-x-2">
                            <FaSave />
                            <span>{loading ? "Saving..." : isEdit ? "Update" : "Publish"}</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default NewsForm;
