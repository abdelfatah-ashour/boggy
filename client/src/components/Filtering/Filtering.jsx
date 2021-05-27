import React, { useState, useEffect } from "react";
import { CHECKED_COLOR } from "../../utils/globalStatement";
import { AiOutlineClose } from "react-icons/ai";
import { FcFilledFilter } from "react-icons/fc";
import { useRouter } from "next/router";
import Style from "./filter.module.css";

export const Filter = ({ url }) => {
	const Router = useRouter();
	const { page, color, price, date } = Router.query;

	const [initialFilter, setInitialFilter] = useState({
		color: color ? color : "All",
		price: price ? price : "All",
		date: date ? date : "newest",
	});

	const prices = [
		{
			name: "price",
			min: 1,
			max: 200,
		},
		{
			name: "price",
			min: 201,
			max: 400,
		},
		{
			name: "price",
			min: 401,
			max: 600,
		},
		{
			name: "price",
			min: 601,
			max: 800,
		},
		{
			name: "price",
			min: 901,
			max: 1000,
		},
		{
			name: "price",
			min: 1001,
			max: 200000,
		},
	];

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

	useEffect(() => {
		// get filter element
		const filter = document.getElementById("filter");
		// get button close filter
		const closeFilter = document.getElementById("closeFilter");
		//get button active filter
		const filterIcon = document.getElementById("filterIcon");
		// on click close filter button active filter
		// will show and filter element will transform (-100%) to hide
		closeFilter.addEventListener("click", () => {
			filter.classList.toggle("activeFilter");
			filterIcon.classList.toggle("hideFilterIcons");
		});
		// return X last logic of filtering
		filterIcon.addEventListener("click", () => {
			filterIcon.classList.toggle("hideFilterIcons");
			filter.classList.toggle("activeFilter");
		});
	}, []);

	return (
		<div>
			<div className={Style.filter + " "} id="filter">
				<div className={"btn " + Style.closeFilter} id="closeFilter">
					<AiOutlineClose />
				</div>
				<button className={"btn " + Style.filterIcon} id="filterIcon">
					<FcFilledFilter />
				</button>
				<div className={Style.ContentFilter}>
					<div className={Style.ColorFiltering}>
						{CHECKED_COLOR.map((item, i) => {
							return (
								<React.Fragment key={item.value}>
									<span
										className={Style.color}
										style={{ backgroundColor: item.value }}
										custom-data={item.value}
										name={item.name}
										onClick={(e) => {
											setInitialFilter({
												...initialFilter,
												[e.target.name]: e.currentTarget.getAttribute(
													"custom-data"
												),
											});
											return Router.replace(
												`${url}?page=${
													page ? page : 1
												}&color=${e.currentTarget.getAttribute(
													"custom-data"
												)}&price=${initialFilter.price}&date=${
													initialFilter.date
												}`
											);
										}}
									></span>
								</React.Fragment>
							);
						})}
					</div>
					<div className={Style.PriceFiltering + " mt-2"}>
						{prices.map((item, i) => {
							return (
								<React.Fragment key={Math.max(item.min + item.max)}>
									<div className="input-group mb-3">
										<label htmlFor={item.min + item.max} className="form-label">
											{item.min + " - " + item.max}
										</label>
										<input
											type="range"
											className="form-range"
											id={item.min + item.max}
											name={item.name}
											min={item.min}
											max={item.max}
											value={
												initialFilter.price > item.min &&
												initialFilter.price < item.max
													? initialFilter.price
													: item.min
											}
											onChange={(e) => {
												setInitialFilter({
													...initialFilter,
													[e.target.name]: e.target.value,
												});
												return Router.replace(
													`${url}?page=${page ? page : 1}&color=${
														initialFilter.color
													}&price=${e.target.value}&date=${initialFilter.date}`
												);
											}}
										/>
									</div>
								</React.Fragment>
							);
						})}
					</div>
					<div className={Style.DateFiltering}>
						{dateValue.map((item, i) => {
							return (
								<React.Fragment key={item.value}>
									<div className="form-check">
										<input
											className="form-check-input"
											type="checkbox"
											name={item.name}
											id={item.value}
											checked={initialFilter.date === item.value ? true : false}
											onChange={(e) => {
												setInitialFilter({
													...initialFilter,
													[e.target.name]: e.currentTarget.getAttribute("id"),
												});
												return Router.replace(
													`${url}?page=${page ? page : 1}&color=${
														initialFilter.color
													}&price=${
														initialFilter.price
													}&date=${e.currentTarget.getAttribute("id")}`
												);
											}}
											readOnly
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
