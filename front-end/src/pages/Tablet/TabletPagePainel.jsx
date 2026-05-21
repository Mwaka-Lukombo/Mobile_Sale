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
import { useTabletStore } from "../../store/tabletsStore";

export const TabletPagePainel = () => {

  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form States
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [informations, setInformations] = useState({
    gigas: "",
    ram: "",
    camera: ""
  });

  const [id, setId] = useState("");

  const {
    isLoading,
    acessorios,
    totalPages,
    currentPage,
    getAcessories,
    createProduct,
    updateProduct,
    deleteProduct
  } = useTabletStore();

  useEffect(() => {
    getAcessories();
  }, [getAcessories])

  const subTitleForm = [
    "Produto",
    "Categoria",
    "Preço",
    "Stock",
    "Vendas",
    "Ações",
  ];

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");
    setStars("");
    setImage(null);
    setImagePreview(null);
    setImageUpload(null);
    setInformations({
      gigas: "",
      ram: "",
      camera: ""
    });
    setId("");
    setIsUpdating(false);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target?.files[0];

    if (file) {
      const reader = new FileReader();
      reader?.readAsDataURL(file);

      reader.onload = () => {
        const base64Image = reader.result;
        setImage(base64Image);
        setImagePreview(base64Image);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      category,
      price: parseInt(price),
      stock: parseInt(stock),
      description,
      stars: parseFloat(stars),
      image: image,
      informations: [informations]
    };

    console.log("Dados a serem enviados:", newProduct);
    await createProduct(newProduct);

    try {
      setTimeout(() => {
        resetForm();
        setShowModal(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      category,
      price: parseInt(price),
      stock: parseInt(stock),
      description,
      stars: parseInt(stars),
      image: image || imageUpload,
      informations: [informations]
    };

    try {
      await updateProduct(id, updatedProduct);
      console.log(`O produto a enviar: `, updatedProduct)
      setTimeout(() => {
        resetForm();
        setShowModal(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const updateItems = (item) => {
    setShowModal(true);
    setName(item?.name);
    setCategory(item?.category);
    setPrice(item?.price);
    setStock(item?.stock);
    setDescription(item?.description);
    setStars(item?.stars);
    setImagePreview(item?.image?.url);
    setImageUpload(item?.image?.url);
    setInformations({
      gigas: item?.informations?.[0]?.gigas || "",
      ram: item?.informations?.[0]?.ram || "",
      camera: item?.informations?.[0]?.camera || ""
    });
    setId(item?._id);
    setIsUpdating(true);
  };

  const deleteItem = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este tablet?")) {
      await deleteProduct(id);
    }
  };

  const filteredAcessories = acessorios?.filter(item =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* HEADER */}
      <MenuComponent />

      {/* CONTENT */}
      <div className="w-full px-4 py-6 md:px-6 lg:px-8">

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <h1 className="text-2xl font-bold text-gray-800">
              Tablets
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

              {/* SEARCH */}
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={17}
                  />
                  <input
                    type="text"
                    placeholder="Pesquisar tablet pelo nome"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-sm sm:w-80 pl-10 h-[40px] rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => {
                  setShowModal((prev) => !prev);
                  resetForm();
                }}
                className="flex items-center p-2 justify-center gap-2 h-[40px] bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm"
              >
                <Plus size={17} />
                <span className="text-sm">Criar Tablet</span>
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
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <LoaderComponent size={8} />
                    </td>
                  </tr>
                ) : filteredAcessories && filteredAcessories.length > 0 ? (
                  filteredAcessories.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                            <img
                              src={item?.image?.url || "https://via.placeholder.com/100"}
                              alt={item?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-800">
                            {item?.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                          {item?.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold text-gray-800">
                          {item?.price} MZN
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center justify-center w-[20px] h-[20px] rounded-full text-xs font-medium ${item?.stock < 5 ? "bg-red-500" : "bg-green-300"} text-color-black`}>
                          {item?.stock}
                        </span>
                       </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-gray-700">
                          {item?.orders ?? 0}
                        </span>
                       </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateItems(item)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() => deleteItem(item?._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash size={12} />
                          </button>
                        </div>
                       </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-3 py-4 text-center text-gray-400">
                      Nenhum tablet encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden">
            {isLoading ? (
              <div className="p-4 text-center">
                <LoaderComponent size={8} />
              </div>
            ) : filteredAcessories && filteredAcessories.length > 0 ? (
              filteredAcessories.map((item) => (
                <div
                  key={item._id}
                  className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                        <img
                          src={item?.image?.url || "https://via.placeholder.com/100"}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-800">
                          {item?.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {item?.category}
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
                        onClick={() => deleteItem(item?._id)}
                        className="text-red-600 p-1"
                      >
                        <Trash size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-xs text-gray-500">Preço:</span>
                      <p className="text-xs font-semibold text-gray-800">
                        {item?.price} MZN
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Stock:</span>
                      <p className="text-xs font-semibold text-green-600">
                        {item?.stock}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Vendas:</span>
                      <p className="text-xs font-semibold text-gray-800">
                        {item?.orders ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400">
                  Nenhum tablet encontrado
                </div>
              </div>
            )}
          </div>

          {/* EMPTY */}
          {!isLoading && (!filteredAcessories || filteredAcessories.length === 0) && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                Nenhum tablet encontrado
              </div>
              <button
                onClick={() => {
                  setShowModal(true);
                  resetForm();
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                + Adicionar novo tablet
              </button>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="my-3 w-full h-[50px] p-2 flex items-center justify-center">
          <div className="join">
            {Array.from({ length: totalPages }).map((_, index) => {
              const Page = index + 1;
              return (
                <button
                  key={Page}
                  onClick={() => getAcessories(Page)}
                  className={`join-item btn p-2 ${currentPage === Page ? "bg-secondary-blue text-white" : "border"} w-[40px] h-[40px] text-xs font-semibold`}
                >
                  {Page}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 overflow-y-auto">
          <div className="max-w-4xl w-full mx-auto -my-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* HEADER */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {!isUpdating ? "Criar novo Tablet" : "Editar Tablet"}
                  </h1>
                  <p className="text-blue-100 text-sm mt-1">
                    Preencha as informações do produto
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <X size={17} />
                </button>
              </div>

              <form onSubmit={!isUpdating ? handleSubmit : handleUpdate} className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* LEFT SIDE */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Nome do Produto
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: iPad Pro 12.9"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full text-xs pl-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Categoria
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full text-xs pl-3 pr-12 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      >
                        <option value="">Selecione a categoria</option>
                        <option value="iPad">iPad</option>
                        <option value="Android">Android</option>
                        <option value="Windows">Windows</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Preço (MZN)
                        </label>
                        <input
                          type="number"
                          placeholder="15000"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                          className="w-full text-xs pl-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Stock
                        </label>
                        <input
                          type="number"
                          placeholder="10"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          required
                          className="w-full text-xs pl-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Estrelas (Avaliação)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="5"
                        placeholder="0 a 5"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        className="w-full text-xs pl-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Imagem
                      </label>
                      <label className="w-full h-[80px] flex flex-col items-center justify-center gap-1 border border-dashed border-gray-300 bg-gray-50 cursor-pointer rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="text-xs text-gray-500">Clique para fazer upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {imagePreview && (
                        <div className="mt-3 w-20 h-20 rounded-lg overflow-hidden border border-gray-300">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Descrição
                      </label>
                      <textarea
                        placeholder="Descreva as características do tablet..."
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-xs p-3 h-[100px] resize-none border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        RAM (GB)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 6GB, 8GB, 12GB"
                        value={informations.ram}
                        onChange={(e) => setInformations({ ...informations, ram: e.target.value })}
                        className="w-full text-xs pl-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Armazenamento (GB)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 128GB, 256GB, 512GB"
                        value={informations.gigas}
                        onChange={(e) => setInformations({ ...informations, gigas: e.target.value })}
                        className="w-full text-xs pl-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Câmera (MP)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 12MP, 13MP, 48MP"
                        value={informations.camera}
                        onChange={(e) => setInformations({ ...informations, camera: e.target.value })}
                        className="w-full text-xs pl-3 h-[40px] border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium h-[40px] text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {!isLoading ? (!isUpdating ? "Criar Tablet" : "Atualizar Tablet") : <LoaderComponent size={8} />}
                  </button>

                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    type="button"
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium text-sm h-[40px] rounded-lg transition-colors"
                  >
                    Cancelar
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