import React from "react";
import Head from "next/head";
import Link from "next/link";
import Style from "../../public/assets/css/404.module.css";

function Error() {
	return (
		<>
			<Head>
				<title> 404 page not found </title>
			</Head>
			<div className={Style.pageNotFound}></div>
		</>
	);
}

export default Error;
