import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
	return (
		<header>
			<span className="nav-head">BRATS</span>
			<div className="menu">
				<svg
					width="36px"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor">
					<path d="M19 8H5V10H19V8ZM19 14H5V16H19V14Z"></path>
				</svg>
			</div>
		</header>
	);
};

export default Navbar;
