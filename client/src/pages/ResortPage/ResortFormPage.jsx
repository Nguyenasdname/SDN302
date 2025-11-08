import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export const ResortFormPage = ({ currentUser }) => {
  const navigate = useNavigate();

  // Chỉ employee mới được vào trang này
  useEffect(() => {
    if (currentUser && currentUser.userRole !== "employee") {
      alert("Bạn không có quyền truy cập trang này!");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Nếu currentUser chưa load xong thì show loading
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // Nếu currentUser không phải employee thì không render form
  if (currentUser.userRole !== "employee") {
    return null;
  }

  const [formData, setFormData] = useState({
    resortName: "",
    resortDescription: "",
    resortPrice: "",
    resortLocation: "",
    resortCapacity: "",
    resortStatus: "available",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      await api.post("/resort", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Tạo resort thành công!");
      navigate("/list");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi tạo resort");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tạo Resort Mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form inputs như bạn đã viết */}
        <div>
          <label className="block mb-1">Tên Resort</label>
          <input
            type="text"
            name="resortName"
            value={formData.resortName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Mô tả Resort</label>
          <textarea
            name="resortDescription"
            value={formData.resortDescription}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Giá (VND)</label>
          <input
            type="number"
            name="resortPrice"
            value={formData.resortPrice}
            onChange={handleChange}
            required
            min={0}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Địa điểm</label>
          <input
            type="text"
            name="resortLocation"
            value={formData.resortLocation}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Sức chứa</label>
          <input
            type="number"
            name="resortCapacity"
            value={formData.resortCapacity}
            onChange={handleChange}
            required
            min={1}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Trạng thái</label>
          <select
            name="resortStatus"
            value={formData.resortStatus}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Ảnh Resort (có thể chọn nhiều ảnh)</label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
        >
          {loading ? "Đang tạo..." : "Tạo Resort"}
        </button>
      </form>
    </div>
  );
};

