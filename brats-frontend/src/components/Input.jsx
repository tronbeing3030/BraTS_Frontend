import React, { useState } from "react";
import "../styles/Input.css";

const Input = (handleDetectAction) => {
	const [inputType, setInputType] = useState("NiFTI");
	const [slices, setSlices] = useState(240);
	const [isProcessing, setIsProcessing] = useState(false);
	return (
		<section>
			<h3>UPLOAD SCANS</h3>

			<div className="upload">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor">
					<path d="M11 11.0001L11 2.0005L13 2.00049L13 11.0001L22.0001 10.9999L22.0002 12.9999L13 13.0001L13.0001 22L11.0001 22L11.0001 13.0001L2.00004 13.0003L2 11.0003L11 11.0001Z"></path>
				</svg>
				<span className="label">Add all files</span>
			</div>

			<div className="files">
				{["T1", "T1ce", "T2", "FLAIR"].map((name) => (
					<div className="token" key={name}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor">
							<path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM17.4571 9.45711L16.0429 8.04289L11 13.0858L8.20711 10.2929L6.79289 11.7071L11 15.9142L17.4571 9.45711Z"></path>
						</svg>
						<span className="token-name">{name}</span>
					</div>
				))}
			</div>

			<div className="orange">
				<div className="type">
					<button
						className="types"
						onClick={() => setInputType("NiFTI")}
						style={{
							cursor:
								inputType === "NiFTI" ? "default" : "pointer",
							backgroundColor:
								inputType === "NiFTI"
									? "#FF5100"
									: "transparent",
							color:
								inputType === "NiFTI" ? "#111729" : "#FF5100",
						}}>
						NiFTI
					</button>
					<button
						className="types"
						onClick={() => setInputType("DiCOM")}
						style={{
							cursor:
								inputType === "DiCOM" ? "default" : "pointer",
							backgroundColor:
								inputType === "DiCOM"
									? "#FF5100"
									: "transparent",
							color:
								inputType === "DiCOM" ? "#111729" : "#FF5100",
						}}>
						DiCOM
					</button>
				</div>

				<div className="slicer">
					<div className="num">
						<button
							className="arrow"
							onClick={() =>
								setSlices((s) => Math.max(1, s - 1))
							}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor">
								<path d="M5 11V13H19V11H5Z"></path>
							</svg>
						</button>
						<span className="slicenum">{slices}</span>
						<button
							className="arrow"
							onClick={() => setSlices((s) => s + 1)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor">
								<path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path>
							</svg>
						</button>
					</div>
					<span className="slbl">Slices</span>
				</div>
			</div>

			<button
				className="act-btn"
				disabled={isProcessing}
				onClick={handleDetectAction}>
				{isProcessing ? "PROCESSING..." : "DETECT"}
			</button>
		</section>
	);
};

export default Input;
