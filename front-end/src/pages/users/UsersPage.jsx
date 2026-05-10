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
import {motion} from 'framer-motion';

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

      {/* CONTENT */}
      <div className="w-full px-4 py-6 md:px-6 lg:px-8">

        {/* TITLE + SEARCH */}
        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
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
                    className="w-full sm:w-80 h-12 pl-11 pr-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </form>

              {/* BUTTON */}
              <button
                onClick={() => setShowModal((prev) => !prev)}
                className="flex items-center justify-center gap-2 h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm"
              >
                <Plus size={20} />
                <span>Criar Usuario</span>
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

                {Array.isArray(dataForm) &&
                  dataForm.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >

                      {/* USER */}
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-800">
                          {item?.name}
                        </span>
                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-4 text-gray-600">
                        {item?.email}
                      </td>

                      {/* ROLE */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800">
                          {item?.role ?? "User"}
                        </span>
                      </td>

                      {/* LAST ACCESS */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {item?.lastAccess ?? "Hoje"}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-300 text-black">
                          {item?.status ?? "Ativo"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <button
                            onClick={() => updateItems(item)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => deleteUser(item?._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash size={18} />
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

            {Array.isArray(dataForm) &&
              dataForm.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors"
                >

                  <div className="flex items-start justify-between mb-3">

                    <div className="flex-1">

                      <h3 className="font-semibold text-gray-800">
                        {item?.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item?.email}
                      </p>
                    </div>

                    <div className="flex gap-2">

                      <button
                        onClick={() => updateItems(item)}
                        className="text-blue-600 p-1"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => deleteUser(item?._id)}
                        className="text-red-600 p-1"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">

                    <div>
                      <span className="text-gray-500">Perfil:</span>

                      <p className="font-semibold text-gray-800">
                        {item?.role ?? "User"}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500">Status:</span>

                      <p className="font-semibold text-green-600">
                        {item?.status ?? "Ativo"}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <span className="text-gray-500">
                        Ultimo acesso:
                      </span>

                       <p>
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

        {/* PAGINATION */}
        <div className="w-full h-[50px] my-5 flex items-center justify-center gap-1">

          {[...Array(totalPages)].map((_, index) => {

            const currentPageIndex = index + 1;

            return (
              <div key={index} className="join">

                <button
                  onClick={() => getUsers(_, currentPageIndex)}
                  className={`join-item btn ${
                    currentPage === currentPageIndex
                      ? "btn-active bg-secondary-blue text-white"
                      : "bg-cinza-claro shadow-xl border "
                  } w-[55px] h-[50px]  text-color-black`}
                >
                  {index + 1}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {showModel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 overflow-y-auto">

          <div className="max-w-2xl w-full mx-auto my-8 md:my-0">

            <motion.div
            initial={{scale:0.85,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:0.2,bounce:1}}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden">

              {/* HEADER */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">

                <div>

                  <h1 className="text-xl font-bold text-white">
                    Crie um novo usuario
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
                  <X size={24} />
                </button>
              </div>

              <form
                onSubmit={!isUpdating ? handleSubmit : handleUpdate}
                className="p-6"
              >

                <div className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome completo
                    </label>

                    <input
                      type="text"
                      placeholder="John Doe"
                      onChange={(e) =>
                        setFullNameUser(e.target.value)
                      }
                      value={fullNameUser || ""}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="johndoe@gmail.com"
                      onChange={(e) =>
                        setEmailUser(e.target.value)
                      }
                      value={emailUser || ""}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>

                    <input
                      type="password"
                      placeholder="********"
                      onChange={(e) =>
                        setPasswordUser(e.target.value)
                      }
                      value={passwordUser || ""}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                      {!isLoading ? (
                        "Submit"
                      ) : (
                        <LoaderComponent size={8} />
                      )}
                    </button>
                  ) : (
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      {!isLoading ? (
                        "Update"
                      ) : (
                        <LoaderComponent size={8} />
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    type="button"
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};