import React, { useEffect, useState } from "react";
import {
  Camera,
  Pencil,
  Plus,
  Search,
  Trash,
  X,
} from "lucide-react";
import {motion} from 'framer-motion'

import {MenuComponent} from '../../components/common/MenuComponent'
import { useProductStore } from "../../store/productStore";
import {LoaderComponent} from '../../components/common/LoaderComponent';


export const  ProductPage = ()=> {
  const [showModel,setShowModal] = useState(false);
   const [nameProduct,setNameProduct] = useState("");
    const [image,setImage] = useState(null);
     const [category,setCategory] = useState("");
      const [price,setPrice] = useState("");
       const [stock,setStock] = useState("");
        const [id,setId] = useState("");
         const [isUpdating,setIsUpadting] = useState(false);
          const [imageUpdate,setImageUpdate] = useState(null);


        const {
          categories,
          getCategories,
          error,
          isLoading,
          createProduct,
          getProducts,
          editProduct,
          products,
          deleteProduct,
          totalPages,
          currentPage
        } = useProductStore();

        useEffect(()=>{
          getCategories();
        },[getCategories]);

        useEffect(()=>{
          getProducts();
        },[getProducts])


  // Dados mockados
  const dataForm = products.map(product => product);


  const subTitleForm = [
    "Product",
    "Category",
    "Price",
    "Stock",
    "Sales",
    "Action",
  ];


  console.log(`Total pages: ${totalPages}`, `Current Page: ${currentPage}`)

  // const resetForm = ()=>{
  //   setNameProduct("");
  //   handleImage("");
  //   setImage(null);
  //   setPrice("");
  //   setStock("");
  //   setCategory("");

  // }

  const resetForm = () => {
  // Resetar todos os campos do formulário
  setNameProduct("");
  setImage(null);
  setCategory("");
  setPrice("");
  setStock("");
  setId("");
  setIsUpadting(false);
  setImageUpdate(null);
  
  
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.value = "";
  }
}
  
  const handleSubmit = async(e)=>{
    e.preventDefault();

    const newProduct ={
      name:nameProduct,
      category,
      price,
      image,
      stock
    }

    await createProduct(newProduct);
    resetForm()
  }

  const handleUpdate = async (e)=>{
    e.preventDefault();
    const newProduct ={
      name:nameProduct,
      category,
      price,
      imageUpdate:image,
      stock
    }

    await editProduct(newProduct,id);
  }

  const handleImage = (e)=>{
     const file = e.target?.files[0];

     const reader = new FileReader();
     reader?.readAsDataURL(file);

     reader.onload = async()=>{
      const base64Image = reader?.result;
      setImage(base64Image)
     }
  }

  const updateItems = (item)=>{
          setShowModal(true);
          setNameProduct(item?.name);
          setImage(item?.image?.url);
          setCategory(item?.category);
          setPrice(item?.price);
          setStock(item?.stock);
          setId(item?._id);
          setIsUpadting(true);
          setImageUpdate(item?.image);
  }

  const handleSearch = (e)=>{
    e.preventDefault();
  }
  

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
              Products
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
                    placeholder="Search product for name"
                    onChange={(e) => getProducts(e.target.value,"")}
                    className="w-full sm:w-80 h-12 pl-11 pr-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </form>

              {/* BUTTON */}
              <button onClick={()=> setShowModal((prev) => !prev)} className="flex items-center justify-center gap-2 h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm">
                <Plus size={20} />
                <span>Create Product</span>
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

    {/* PRODUCT */}
     {Array.isArray(dataForm) && dataForm.map((item,index) => (
      <tr className="hoder:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
          <img
            src={item?.image?.url}
            alt="Iphone 12"
            className="w-full h-full object-cover"
          />
        </div>

        <span className="font-medium text-gray-800">
          {item?.name}
        </span>

      </div>
    </td>

    {/* CATEGORY */}
    <td className="px-6 py-4 text-gray-600">
      {item?.category}
    </td>

    {/* PRICE */}
    <td className="px-6 py-4">
      <span className="font-semibold text-gray-800">
        {item?.price} <b className="text-sm">MZN</b>
      </span>
    </td>

    {/* STOCK */}
    <td className="px-6 py-4">
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item?.stock < 5 ? "bg-red-500" :"bg-green-300"} text-color-black`}>
        {item?.stock}
      </span>
    </td>

    {/* SALES */}
    <td className="px-6 py-4">
      <span className="text-sm font-medium text-gray-700">
        {item?.sales ?? "No sales"}
      </span>
    </td>

    {/* ACTIONS */}
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">

        <button onClick={()=> updateItems(item)} className="text-blue-600 hover:text-blue-800 transition-colors">
          <Pencil size={18} />
        </button>

        <button onClick={()=> deleteProduct(item?._id)} className="text-red-600 hover:text-red-800 transition-colors">
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
            {Array.isArray(dataForm) && dataForm.map((item,index) => (
              <div className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">

    <div className="flex items-start justify-between mb-3">

      <div className="flex items-center gap-3 flex-1">

        <div key={index} className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
          <img
            src={item?.image?.url}
            alt={item?.image.url}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">
            {item?.name}
          </h3>

          <p className="text-sm text-gray-500">
            {item?.category}
          </p>
        </div>
      </div>

      <div className="flex gap-2">

        <button onClick={()=> updateItems(item)} className="text-blue-600 p-1">
          <Pencil size={16} />
        </button>

        <button onClick={()=> deleteProduct(item?._id)} className="text-red-600 p-1">
          <Trash size={16} />
        </button>

      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 text-sm">

      <div>
        <span className="text-gray-500">Preço:</span>

        <p className="font-semibold text-gray-800">
          {item?.price} <b>MZN</b>
        </p>
      </div>

      <div>
        <span className="text-gray-500">Estoque:</span>

        <p className="font-semibold text-green-600">
          {item?.stock}
        </p>
      </div>

      <div className="col-span-2">
        <span className="text-gray-500">Sales:</span>

        <p>{item?.salte ?? "No sales"}</p>
      </div>

    </div>
  </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {dataForm?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                Nenhum dado encontrado
              </div>

              <button onClick={()=> setShowModal(true)} className="text-blue-600 hover:text-blue-700">
                + Adicionar novo
              </button>
            </div>
          )}
          
        </div>

        {/* Pagination */}
        <div className="w-full h-[50px]  my-5 flex items-center justify-center gap-1">
          {[...Array(totalPages)].map((_,index)=> {
            const currentPageIndex = index + 1;

            return(
              <div className="join">
                <button
                onClick={()=> getProducts(_,currentPageIndex)} 
                className={`join-item btn ${currentPage === currentPageIndex  ? "btn-active bg-secondary-blue text-white" : "bg-cinza-claro shadow-xl border "}  w-[55px] h-[50px] text-color-black`}
                >{index + 1}</button>
              </div>
            )
          })}
        </div>
      </div>

      {/* MODAL FRONT-END */}
      {showModel && (
        <div 
        
        
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 overflow-y-auto">

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
                  Create new Product
                </h1>

                <p className="text-blue-100 text-sm mt-1">
                  Write down your characteristics
                </p>
              </div>

              <button onClick={()=> {
                setShowModal(false);
                resetForm();
              }} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
                <X size={24} />
              </button>
            </div>

            
            <form onSubmit={!isUpdating ? handleSubmit : handleUpdate} className="p-6">

              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product name
                  </label>

                  <input
                    type="text"
                    placeholder="iPhone X"
                    onChange={(e) => setNameProduct(e.target.value)}
                    value={nameProduct || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>

                  <label className="w-full h-[50px] input border bg-cinza-medio border-[#ccc] cursor-pointer">
                    <input
                    type="file"
                    placeholder="image"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <Camera className="text-white" />
                  </label>
                    {image && (
                      <div className="w-[60px] h-[60px] border my-2">
                        <img src={image} alt={image} 
                        className="w-full h-full bg-contain bg-center"
                        />
                      </div>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>

                  <select onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="selecione">Selecione a categoria</option>
                    {Array.isArray(categories) && categories.map((value,index) => (
                      <option key={value?._id} value={value?.name}>{value?.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>

                  <input
                    type="number"
                    placeholder="25000"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>

                  <input
                    type="text"
                    placeholder="0-100"
                    onChange={(e) => setStock(e.target.value)}
                    value={stock || ""}
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
                  {!isLoading ? "Submit" : <LoaderComponent size={8} />}
                </button>
              ) : (
                <button
                disabled={isLoading}
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  {!isLoading ? "Update" : <LoaderComponent size={8} />}
                </button>
              )}

                <button
                onClick={()=> {
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
}