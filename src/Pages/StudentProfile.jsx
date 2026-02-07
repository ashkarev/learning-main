import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer } from "@/Components/ui/chart";

import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "flowbite-react";

import PieChartCard from "@/Components/ui/PieChart.jsx";
import PerformanceInsights from "../Components/PerformanceInsight.jsx";
import AchievementInProfile from "../Components/AchievementInProfile.jsx";
import Footer from "../Components/Footer.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserDetails, updateUser } from "../services/allApi";
import { authContext } from "../context/AuthContext";
import { baseUrl } from "../services/baseUrl";

// Custom Modal Component
const EditProfileModal = ({
    show,
    onClose,
    data,
    setData,
    onSave,
    onImageChange,
    preview,
}) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 my-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-xl font-bold">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center justify-center mb-6">
                        <div className="relative group cursor-pointer">
                            <img
                                src={preview}
                                alt="Profile Preview"
                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 shadow-md transition-transform group-hover:scale-105"
                            />
                            <label
                                htmlFor="imgUpload"
                                className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium text-xs"
                            >
                                Change
                            </label>
                            <input
                                type="file"
                                id="imgUpload"
                                onChange={onImageChange}
                                className="hidden"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Click to upload new picture
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-1 block">
                                Username
                            </label>
                            <input
                                type="text"
                                value={data.userName || ""}
                                onChange={(e) => setData({ ...data, userName: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                                placeholder="Enter username"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-1 block">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={data.phone || ""}
                                onChange={(e) => setData({ ...data, phone: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-1 block">
                                Bio
                            </label>
                            <textarea
                                rows="3"
                                value={data.bio || ""}
                                onChange={(e) => setData({ ...data, bio: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-200 font-medium transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 font-medium transition-transform active:scale-95 text-sm"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const StudentProfile = () => {
    const { token } = useContext(authContext);

    const [userData, setUserData] = useState({});
    const [editData, setEditData] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const [preview, setPreview] = useState(
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    );

    const chartData = [
        { Day: "Mon", time: 1 },
        { Day: "Tue", time: 2 },
        { Day: "Sat", time: 1 },
        { Day: "Thu", time: 3 },
        { Day: "Fri", time: 2 },
    ];

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setEditData(userData || {});

        if (userData?.proPic) {
            if (userData.proPic.startsWith("http")) {
                setPreview(userData.proPic);
            } else {
                setPreview(`${baseUrl}/uploads/${userData.proPic}`);
            }
        }
    }, [userData]);

    const getUser = async () => {
        try {
            let header = { Authorization: `Bearer ${token}` };
            let apires = await getUserDetails(header);

            if (apires.status === 200) {
                setUserData(apires.data);
            }
        } catch (error) {
            toast.error("Failed to load profile");
        }
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setEditData({ ...editData, proPic: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSaveProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("userName", editData.userName || "");
            formData.append("phone", editData.phone || "");
            formData.append("bio", editData.bio || "");

            if (editData.proPic instanceof File) {
                formData.append("proPic", editData.proPic);
            }

            if (!editData._id) {
                toast.error("Refresh page and try again");
                return;
            }

            const header = { Authorization: `Bearer ${token}` };

            const apires = await updateUser(editData._id, formData, header);

            if (apires.status === 200) {
                toast.success("Profile updated");
                setUserData(apires.data.userDetails);
                getUser();
                setOpenModal(false);
            }
        } catch (error) {
            toast.error("Profile update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-sky-600 to-blue-800 px-6 pt-12 pb-28">
                {/* subtle decorative glow */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Title */}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                            Student Dashboard
                        </h1>
                        <p className="mt-3 text-blue-100 text-base md:text-lg max-w-md">
                            Track your learning progress, performance insights, and
                            achievements
                        </p>
                    </div>

                    {/* Back button */}
                    <Link
                        to="/"
                        className="
        inline-flex items-center gap-2
        px-6 py-2.5
        rounded-full
        bg-white/15 backdrop-blur-md
        border border-white/30
        text-white font-medium text-sm
        hover:bg-white/25 hover:border-white/50
        transition-all duration-300
        shadow-lg shadow-blue-900/30
      "
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>

            {/* Profile Card Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Profile Section */}
                        <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center">
                            <div className="relative mb-6">
                                <img
                                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-blue-50"
                                    src={preview}
                                    alt=""
                                />
                                <div
                                    className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white"
                                    title="Active"
                                ></div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 text-center">
                                {userData.userName || "Student"}
                            </h2>
                            <p className="text-blue-500 font-medium text-sm mb-6">
                                {userData.email}
                            </p>

                            <Button
                                onClick={() => setOpenModal(true)}
                                className="w-full max-w-[200px] bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl py-1 transition-all"
                            >
                                Edit Profile
                            </Button>
                        </div>

                        {/* Right Details Section */}
                        <div className="w-full md:w-2/3 p-8 md:p-12">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                                Profile Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Phone
                                    </label>
                                    <p className="text-gray-700 font-medium mt-1">
                                        {userData.phone || "Not provided"}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Member Since
                                    </label>
                                    <p className="text-gray-700 font-medium mt-1">January 2025</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Bio
                                    </label>
                                    <p className="text-gray-600 mt-1 leading-relaxed">
                                        {userData.bio ||
                                            "No bio added yet. Click edit to tell us about yourself!"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 pl-2 border-l-4 border-blue-500">
                            Weekly Activity
                        </h3>
                        <ChartContainer className="w-full h-[300px]">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="Day"
                                    stroke="#9ca3af"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Bar
                                    dataKey="time"
                                    fill="#3b82f6"
                                    radius={[6, 6, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ChartContainer>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <PieChartCard />
                    </div>
                </div>

                {/* Insights & Achievements */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <PerformanceInsights />
                    <AchievementInProfile />
                </div>
            </div>

            <Footer />

            {/* Custom Edit Profile Modal */}
            <EditProfileModal
                show={openModal}
                onClose={() => setOpenModal(false)}
                data={editData}
                setData={setEditData}
                onSave={onSaveProfile}
                onImageChange={onImageChange}
                preview={preview}
            />
        </div>
    );
};

export default StudentProfile;
