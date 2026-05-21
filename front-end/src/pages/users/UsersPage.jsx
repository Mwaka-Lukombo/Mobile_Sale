import React, { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Search,
  Trash,
  X,
} from "lucide-react";

import { MenuComponent } from "../../components/common/MenuComponent";
import { LoaderComponent } from "../../components/common/LoaderComponent";
import { useUserStore } from "../../store/userStore";

export const UsersPage = () => {

  const [showModel, setShowModal] = useState(false);

  const [fullNameUser, setFullNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  const [idUser, setIdUser] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    users,
    getUsers,
    createUser,
    editUser,
    deleteUser,
    isLoading,
    totalPages,
    currentPage,
  } = useUserStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const dataForm = users.map((user) => user);

  const subTitleForm = [
    "Usuario",
    "Email",
    "Perfil",
    "Ultimo acesso",
    "Status",
    "Ações",
  ];

  const resetForm = () => {
    setFullNameUser("");
    setEmailUser("");
    setPasswordUser("");
    setIdUser("");
    setIsUpdating(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name: fullNameUser,
      email: emailUser,
      password: passwordUser,
    };

    await createUser(newUser);

    resetForm();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newUser = {
      name: fullNameUser,
      email: emailUser,
      password: passwordUser,
    };

    await editUser(newUser, idUser);
  };

  const updateItems = (item) => {
    setShowModal(true);
    setFullNameUser(item?.name);
    setEmailUser(item?.email);
    setIdUser(item?._id);
    setIsUpdating(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  console.log(totalPages)

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* HEADER */}
      <MenuComponent />

      {/* CONTENT - Mesmo estilo da ProductPage */}
      <div className="w-full px-4 py-6 md:px-6 lg:px-8">

        {/* TITLE + SEARCH */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <h1 className="text-2xl font-bold text-gray-800">
              Usuarios
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

              {/* SEARCH */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Pesquisar usuario pelo nome"
                    onChange={(e) => getUsers(e.target.value, "")}
                    className="w-full sm:w-80 h-10 pl-11 pr-4 rounded-xl border text-sm border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </form>

              {/* BUTTON */}
              <button
                onClick={() => setShowModal((prev) => !prev)}
                className="flex items-center justify-center gap-2 h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm"
              >
                <Plus size={17} />
                <span className="text-sm">Criar Usuario</span>
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* DESKTOP */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {subTitleForm.map((item, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Array.isArray(dataForm) && dataForm.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* USER */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                          {item?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-gray-800 text-xs">
                          {item?.name}
                        </span>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="text-xs font-semibold px-6 py-4 text-gray-600">
                      {item?.email}
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-gray-800">
                        {item?.role ?? "User"}
                      </span>
                    </td>

                    {/* LAST ACCESS */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-gray-700">
                        {item?.lastAccess
                          ? new Date(item.lastAccess).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                          : "Hoje"}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-full text-xs font-medium bg-green-300 text-black">
                        {item?.status ?? "A"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateItems(item)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => deleteUser(item?._id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden">
            {Array.isArray(dataForm) && dataForm.map((item, index) => (
              <div
                key={item._id}
                className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                      {item?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-800">
                        {item?.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-500">
                        {item?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateItems(item)}
                      className="text-blue-600 p-1"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => deleteUser(item?._id)}
                      className="text-red-600 p-1"
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-xs text-gray-500">Perfil:</span>
                    <p className="text-xs font-semibold text-gray-800">
                      {item?.role ?? "User"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Status:</span>
                    <p className="text-xs font-semibold text-green-600">
                      {item?.status ?? "Ativo"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-gray-500">Ultimo acesso:</span>
                    <p className="text-xs">
                      {item?.lastAccess
                        ? new Date(item.lastAccess).toLocaleString("pt-br", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                        : "Hoje"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY */}
          {dataForm?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                Nenhum usuario encontrado
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                + Adicionar novo usuario
              </button>
            </div>
          )}
        </div>

        {/* PAGINATION - Mesmo estilo da ProductPage */}
        <div className="w-full h-[50px] my-5 flex items-center justify-center">
          {[...Array(totalPages)].map((_, index) => {
            const currentPageIndex = index + 1;
            return (
              <div className="join" key={index}>
                <button
                  onClick={() => getUsers(_, currentPageIndex)}
                  className={`join-item btn ${currentPage === currentPageIndex ? "btn-active bg-secondary-blue text-white" : "border"} w-[40px] h-[40px] text-color-black text-xs`}
                >
                  {index + 1}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL - Mesmo estilo da ProductPage */}
      {showModel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 overflow-y-auto">
          <div className="max-w-xl w-full mx-auto my-7">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
                <div>
                  <h1 className="text-lg font-bold text-white">
                    {!isUpdating ? "Crie um novo usuario" : "Atualizar usuario"}
                  </h1>
                  <p className="text-blue-100 text-sm mt-1">
                    Coloque as suas credenciais
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <X size={19} />
                </button>
              </div>

              <form
                onSubmit={!isUpdating ? handleSubmit : handleUpdate}
                className="p-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      onChange={(e) => setFullNameUser(e.target.value)}
                      value={fullNameUser || ""}
                      className="w-full text-xs pl-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="johndoe@gmail.com"
                      onChange={(e) => setEmailUser(e.target.value)}
                      value={emailUser || ""}
                      className="w-full text-xs pl-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      onChange={(e) => setPasswordUser(e.target.value)}
                      value={passwordUser || ""}
                      className="w-full text-xs pl-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  {!isUpdating ? (
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      {!isLoading ? "Submit" : <LoaderComponent size={8} />}
                    </button>
                  ) : (
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium h-[40px] text-xs rounded-lg transition-colors"
                    >
                      {!isLoading ? "Update" : <LoaderComponent size={8} />}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    type="button"
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium h-[40px] text-xs rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};