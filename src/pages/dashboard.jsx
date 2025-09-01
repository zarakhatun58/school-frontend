"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Dialog } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { API_URL } from "../lib/api";

const Dashboard = () => {
    const [schools, setSchools] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        contact: "",
        email_id: "",
        image: null,
    });
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
    const [previewImage, setPreviewImage] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchSchools();
    }, []);

const fetchSchools = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/api/schools`);
        const schoolArray = Array.isArray(data) ? data : data.schools || [];
        setSchools(schoolArray);
    } catch (err) {
        console.error(err);
        setSchools([]);
    }
};


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
        if (file) setPreviewImage(URL.createObjectURL(file));
    };

const onSubmit = async (data) => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("address", data.address);
      form.append("city", data.city);
      form.append("state", data.state);
      form.append("contact", data.contact);
      form.append("email_id", data.email_id);
      if (data.image && data.image[0]) {
        form.append("image", data.image[0]);
      }

      let responseData;
      if (editingId) {
        const response = await axios.put(
          `${API_URL}/api/schools/${editingId}`,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        responseData = response.data;

        setSchools((prev) =>
          prev.map((s) =>
            s.id === editingId
              ? {
                  ...s,
                  ...data,
                  image: responseData.filename ? responseData.filename : s.image,
                }
              : s
          )
        );
      } else {
        const response = await axios.post(`${API_URL}/api/schools`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        responseData = response.data;
        await fetchSchools();
      }

      setSuccessMessage(responseData.message);
      setTimeout(() => setSuccessMessage(""), 3000);
      setModalOpen(false);
      reset(); // reset form fields
      setEditingId(null);
      setPreviewImage(null);
    } catch (err) {
      alert(err.message || "Operation failed");
    }
  };


    const handleEdit = (school) => {
        setEditingId(school.id);
        setFormData({
            name: school.name,
            address: school.address,
            city: school.city,
            state: school.state,
            contact: school.contact,
            email_id: school.email_id,
            image: null,
        });
        setPreviewImage(
            school.image ? `${API_URL}/schoolImages/${school.image}` : "/placeholder.png"
        );
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete?")) {
            await axios.delete(`${API_URL}/api/schools/${id}`);
            setSuccessMessage("School deleted successfully!");
            fetchSchools();
            setSuccessMessage("School deleted successfully!");
            setTimeout(() => setSuccessMessage(""), 2000);
        }
    };
    const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;
const currentItems = schools.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil((schools || []).length / itemsPerPage);

    return (
        <div className="p-4 sm:p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <Button
                onClick={() => {
                    setModalOpen(true);
                    setEditingId(null);
                    setPreviewImage(null);
                }}
                className="mb-4 w-full sm:w-auto"
            >
                Add School
            </Button>
            {successMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 border border-green-300 rounded text-sm">
                    {successMessage}
                </div>
            )}
            <div className="hidden md:block overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Image</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Address</th>
                            <th className="border px-4 py-2">City</th>
                            <th className="border px-4 py-2">State</th>
                            <th className="border px-4 py-2">Contact</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((school) => (
                            <tr key={school.id}>
                                <td className="border px-4 py-2">
                                    <img
                                        src={
                                            school.image
                                                ? `${API_URL}/schoolImages/${school.image}`
                                                : "/placeholder.png"
                                        }
                                        alt={school.name}
                                        className="w-12 h-12 object-cover rounded"
                                        onError={(e) => (e.target.src = "/placeholder.png")}
                                    />
                                </td>
                                <td className="border px-4 py-2 text-sm">{school.name}</td>
                                <td className="border px-4 py-2 text-sm">{school.address}</td>
                                <td className="border px-4 py-2 text-sm">{school.city}</td>
                                <td className="border px-4 py-2 text-sm">{school.state}</td>
                                <td className="border px-4 py-2 text-sm">{school.contact}</td>
                                <td className="border px-4 py-2 text-sm">{school.email_id}</td>
                                <td className="border px-4 py-2 flex flex-col sm:flex-row gap-2">
                                    <Button onClick={() => handleEdit(school)}>Edit</Button>
                                    <Button variant="destructive" onClick={() => handleDelete(school.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="block md:hidden space-y-4">
                {currentItems.map((school) => (
                    <div key={school.id} className="border p-4 rounded shadow">
                        <img
                            src={
                                school.image
                                    ? `${API_URL}/schoolImages/${school.image}`
                                    : "/placeholder.png"
                            }
                            alt={school.name}
                            className="w-full h-40 object-cover mb-2 rounded"
                            onError={(e) => (e.target.src = "/placeholder.png")}
                        />
                        <h2 className="font-bold text-xs">{school.name}</h2>
                        <p className="text-xs">{school.address}</p>
                        <p className="text-xs">
                            {school.city}, {school.state}
                        </p>
                        <p className="text-xs">Contact: {school.contact}</p>
                        <p className="text-xs">Email: {school.email_id}</p>
                        <div className="flex space-x-2 mt-2">
                            <Button onClick={() => handleEdit(school)} className="text-xs">
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                className="text-xs"
                                onClick={() => handleDelete(school.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        onClick={() => setCurrentPage(i + 1)}
                        className="bg-[#1a2246] text-xs"
                    >
                        {i + 1}
                    </Button>
                ))}
            </div>
            {modalOpen && (
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <form
                         onSubmit={handleSubmit(onSubmit)}
                        className="bg-white p-4 rounded shadow-md max-w-2xl mx-auto mt-10"
                    >
                        <h2 className="text-sm font-semibold mb-4">
                            {editingId ? "Update School" : "Add School"}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    className="text-xs h-8 px-2"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label>Address</Label>
                                <Input
                                    className="text-xs h-8 px-2"
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label>City</Label>
                                <Input
                                    className="text-xs h-8 px-2"
                                    value={formData.city}
                                    onChange={(e) =>
                                        setFormData({ ...formData, city: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label>State</Label>
                                <Input
                                    className="text-xs h-8 px-2"
                                    value={formData.state}
                                    onChange={(e) =>
                                        setFormData({ ...formData, state: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label>Contact</Label>
                                <Input
                                    className="text-xs h-8 px-2"
                                    value={formData.contact}
                                    onChange={(e) =>
                                        setFormData({ ...formData, contact: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    className="text-xs h-8 px-2"
                                    value={formData.email_id}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email_id: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <Label>Image</Label>
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-20 h-20 object-cover mb-2 rounded"
                                        onError={(e) => (e.target.src = "/placeholder.png")}
                                    />
                                )}
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required={!editingId}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                type="submit"
                                className="text-xs py-1 px-3 bg-[#1a2246]"
                            >
                                {editingId ? "Update" : "Add"}
                            </Button>
                            <Button
                                className="text-xs py-1 px-3 bg-[#1a2246]"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Dialog>
            )}
        </div>
    );
};

export default Dashboard;
