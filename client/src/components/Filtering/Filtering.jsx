import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHECKED_COLOR } from "../../utilities/globalStatement";
import { AiOutlineClose } from "react-icons/ai";
import { FcFilledFilter } from "react-icons/fc";
import { useRouter } from "next/router";
import { DISPLAY, HIDDEN } from "../../redux/slices/filter";
import Style from "./filter.module.css";

export const Filter = ({ url }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state);
  const Router = useRouter();
  const { page, color, price, date } = Router.query;

  const dateValue = [
    {
      name: "date",
      value: "newest",
    },
    {
      name: "date",
      value: "oldest",
    },
  ];

  return (
    <div>
      <div className={filter ? Style.filter + " activeFilter" : Style.filter}>
        <div className={Style.closeFilter} onClick={() => dispatch(HIDDEN())}>
          <AiOutlineClose />
        </div>
        <button
          className={filter ? "btn d-none" : "btn " + Style.filterIcon}
          onClick={() => dispatch(DISPLAY())}>
          <FcFilledFilter />
        </button>
        <div className={Style.ContentFilter}>
          <div className={Style.ColorFiltering}>
            {CHECKED_COLOR.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <span
                    className={Style.color}
                    style={{ backgroundColor: item.value }}
                    custom-data={item.value}
                    name={item.name}
                    onClick={(e) => {
                      return Router.replace(
                        `${url}?page=${
                          page ? page : 1
                        }&color=${e.currentTarget.getAttribute(
                          "custom-data"
                        )}&price=${price ? price : "All"}&date=${
                          date ? date : "newest"
                        }`
                      );
                    }}></span>
                </React.Fragment>
              );
            })}
          </div>
          <div className="my-4">
            <div className="input-group">
              <label htmlFor="customRange2" className="form-label">
                sort by Price :
              </label>
              <input
                type="range"
                className="form-range form-range-track-height"
                min="0"
                max="1000"
                id="customRange2"
                defaultValue={price ? price : 0}
                onChange={(e) => {
                  return Router.replace(
                    `${url}?page=${page ? page : 1}&color=${
                      color ? color : "All"
                    }&price=${price ? e.target.value.toString() : "All"}&date=${
                      date ? date : "newest"
                    }`
                  );
                }}
              />
            </div>
          </div>
          <div>
            {dateValue.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={item.name}
                      id={item.value}
                      checked={
                        date ? (date === item.value ? true : false) : false
                      }
                      onChange={(e) => {
                        return Router.push(
                          `${url}?page=${page ? page : 1}&color=${
                            color ? color : "All"
                          }&price=${
                            price ? price : "All"
                          }&date=${e.currentTarget.getAttribute("id")}`
                        );
                      }}
                    />
                    <label className="form-check-label" htmlFor={item.value}>
                      {item.value}
                    </label>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
