import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Axios from "../utilities/Axios";

import {
  GroupChecked,
  InputSelect,
  InputUploadProduct,
} from "../utilities/InputUploadCTRL";

import {
  BRAND_OF_CLOTHES,
  BRAND_OF_LAPTOPS,
  BRAND_OF_MOBILES,
  CATEGORY_SELECTION,
  CHECKED_COLOR,
  CHECK_SD_MEMORY_LAPTOPS,
  CHECK_SD_MEMORY_MOBILES,
  CHECK_SIZE_RAM_OF_LAPTOPS,
  CHECK_SIZE_RAM_OF_MOBILES,
  CHECK_SIZE_OF_CLOTHES,
  CLOTHES_SECTION_SELECTION,
  LAPTOPS_AND_MOBILES_SECTION_SELECTION,
} from "../utilities/globalStatement";

import { getTokenUser } from "../utilities/getToken";
import { toast } from "react-toastify";
import Style from "../../public/assets/css/uploadProduct.module.css";

export default function index() {
  // initial state of upload product form
  const [createProduct, setCreateProduct] = useState({
    Name: null,
    Category: null,
    Section: null,
    Brand: null,
    Price: null,
    Qty: null,
  });
  // initial state of upload product form as a CheckBoxes
  const [checked, setChecked] = useState({
    Color: [],
    Size: [],
    SDMemory: [],
    SDHard: [],
    MemoryRamMobiles: [],
    MemoryRamLaptops: [],
  });

  // initial state of upload product form as a File image
  const [file, setFile] = useState(null);
  const { Category, Section } = createProduct;

  // handle any change into input is text or number
  const handleInput = (e) => {
    setCreateProduct({
      ...createProduct,
      [e.target.name]: e.target.value,
    });
  };

  // handle any change into input type is checkbox
  const handleChecked = (e) => {
    e.target.name === "Color" || e.target.name === "Size"
      ? setChecked({
          ...checked,
          [e.target.name]:
            e.target.checked &&
            checked[e.target.name].includes(e.target.value) === false
              ? [...checked[e.target.name], ...[e.target.value]]
              : checked[e.target.name].filter((item) => {
                  return item !== e.target.value;
                }),
          SDHard: [],
          SDMemory: [],
          MemoryRamMobiles: [],
          MemoryRamLaptops: [],
        })
      : null;

    e.target.name === "SDHard" || e.target.name === "MemoryRamLaptops"
      ? setChecked({
          ...checked,
          [e.target.name]:
            e.target.checked &&
            checked[e.target.name].includes(e.target.value) === false
              ? [...checked[e.target.name], ...[e.target.value]]
              : checked[e.target.name].filter((item) => {
                  return item !== e.target.value;
                }),
          Size: [],
          SDMemory: [],
          MemoryRamMobiles: [],
        })
      : null;

    e.target.name === "SDMemory" || e.target.name === "MemoryRamMobiles"
      ? setChecked({
          ...checked,
          [e.target.name]:
            e.target.checked &&
            checked[e.target.name].includes(e.target.value) === false
              ? [...checked[e.target.name], ...[e.target.value]]
              : checked[e.target.name].filter((item) => {
                  return item !== e.target.value;
                }),
          Size: [],
          SDHard: [],
          MemoryRamLaptops: [],
        })
      : null;
  };

  //handle to catch file upload
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // submit upload product
  const handleUpload = async () => {
    const { Name, Category, Section, Brand, Qty, Price } = createProduct;
    const {
      Color,
      Size,
      SDHard,
      SDMemory,
      MemoryRamMobiles,
      MemoryRamLaptops,
    } = checked;
    let data = new FormData();

    // create FORM DATA for all inputs form
    data.append("Name", Name);
    data.append("Category", Category);
    data.append("Section", Section);
    data.append("Brand", Brand);
    data.append("Price", Price);
    data.append("Qty", Qty);
    for (let index = 0; index < Color.length; index++) {
      data.append("Color", Color[index]);
    }
    if (Size.length > 0) {
      for (let index = 0; index < Size.length; index++) {
        data.append("Size", Size[index]);
      }
    }
    if (SDHard.length > 0) {
      for (let index = 0; index < SDHard.length; index++) {
        data.append("SDHard", SDHard[index]);
      }
    }
    if (SDMemory.length > 0) {
      for (let index = 0; index < SDMemory.length; index++) {
        data.append("SDMemory", SDMemory[index]);
      }
    }
    if (MemoryRamMobiles.length > 0) {
      for (let index = 0; index < MemoryRamMobiles.length; index++) {
        data.append("MemoryRamMobiles", MemoryRamMobiles[index]);
      }
    }

    if (MemoryRamLaptops.length > 0) {
      for (let index = 0; index < MemoryRamLaptops.length; index++) {
        data.append("MemoryRamLaptops", MemoryRamLaptops[index]);
      }
    }

    data.append("ImageProduct", file);
    // endpoint of upload product
    await Axios.post(`/products/create`, data)
      .then(() => {
        alert("🚀 uploaded product");
      })
      .catch((error) => {
        if (!error.response) {
          toast.warn(error.message);
        } else if (error.request) {
          toast.warn("server down...try again soon♥");
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Uploading Product</title>
      </Head>
      <div className="container">
        <form className={"col-md-6 " + Style.formUploadProduct}>
          <h4 className="text-center mb-4">Form Upload</h4>
          <InputUploadProduct
            name="Name"
            type="text"
            placeholder="new product"
            label="name product"
            handleInput={handleInput}
          />

          <InputSelect
            name="Category"
            label="Category"
            titles={CATEGORY_SELECTION}
            handleInput={handleInput}
          />
          {Category === "clothes" ? (
            <>
              <InputSelect
                name="Section"
                label="Section"
                titles={CLOTHES_SECTION_SELECTION}
                handleInput={handleInput}
              />
              <InputSelect
                name="Brand"
                label="Brand"
                titles={BRAND_OF_CLOTHES}
                handleInput={handleInput}
              />
            </>
          ) : null}

          {Category === "laptops-and-mobiles" ? (
            <InputSelect
              name="Section"
              label="Section"
              titles={LAPTOPS_AND_MOBILES_SECTION_SELECTION}
              handleInput={handleInput}
            />
          ) : null}
          {Section === "laptops" ? (
            <InputSelect
              name="Brand"
              label="brand of laptops"
              titles={BRAND_OF_LAPTOPS}
              handleInput={handleInput}
            />
          ) : null}
          {Section === "mobiles" ? (
            <InputSelect
              name="Brand"
              label="brand of mobiles"
              titles={BRAND_OF_MOBILES}
              handleInput={handleInput}
            />
          ) : null}
          <InputUploadProduct
            name="Price"
            type="number"
            placeholder="price"
            label="price"
            handleInput={handleInput}
          />
          <InputUploadProduct
            name="Qty"
            type="number"
            placeholder="quantity"
            label="quantity"
            handleInput={handleInput}
          />

          <div className="checkedInputs">
            {Section ? (
              <GroupChecked
                handleInput={handleChecked}
                name={"Color"}
                label={"Color"}
                optionList={CHECKED_COLOR}
              />
            ) : null}

            {Category === "clothes" ? (
              <GroupChecked
                handleInput={handleChecked}
                name={"Size"}
                label={"Size"}
                optionList={CHECK_SIZE_OF_CLOTHES}
              />
            ) : null}

            {Section === "mobiles" ? (
              <>
                <GroupChecked
                  handleInput={handleChecked}
                  name={"SDMemory"}
                  label={"Memory"}
                  optionList={CHECK_SD_MEMORY_MOBILES}
                />
                <GroupChecked
                  handleInput={handleChecked}
                  name={"MemoryRamMobiles"}
                  label={"Memory RAM"}
                  optionList={CHECK_SIZE_RAM_OF_MOBILES}
                />
              </>
            ) : null}

            {Section === "laptops" ? (
              <>
                <GroupChecked
                  handleInput={handleChecked}
                  name={"SDHard"}
                  label={"SD Hard"}
                  optionList={CHECK_SD_MEMORY_LAPTOPS}
                />
                <GroupChecked
                  handleInput={handleChecked}
                  name={"MemoryRamLaptops"}
                  label={"Memory Ram"}
                  optionList={CHECK_SIZE_RAM_OF_LAPTOPS}
                />
              </>
            ) : null}

            <div className="mb-3" onChange={handleFile}>
              <label htmlFor="formFile" className="form-label">
                select file of product
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                name="ImageProduct"
              />
            </div>
          </div>
          <div className="row">
            <button
              type="submit"
              className={"btn w-25 mx-auto " + Style.uploadBtn}
              onClick={handleUpload}>
              Upload
            </button>
          </div>
        </form>
        <div className={Style.arrowBack}>
          <Link href="/">
            <a>
              <FaArrowLeft />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const user = getTokenUser(req);

  if (!user) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return {
    props: {},
  };
}
