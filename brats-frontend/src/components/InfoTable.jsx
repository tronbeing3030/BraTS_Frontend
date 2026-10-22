import React, { useState } from "react";
import "../styles/InfoTable.css";

const InfoTable = () => {
	const [metrics, setMetrics] = useState({
		neuroticCore: "0.00",
		pretumoralEdema: "5781.13",
		enhancingTumor: "0.00",
		totalTumour: "5781.13",
	});

	const handleDetectAction = () => {
		setIsProcessing(true);
		setMetrics({
			neuroticCore: "---",
			pretumoralEdema: "---",
			enhancingTumor: "---",
			totalTumour: "---",
		});

		setTimeout(() => {
			setMetrics({
				neuroticCore: "0.00",
				pretumoralEdema: "5781.13",
				enhancingTumor: "0.00",
				totalTumour: "5781.13",
			});
			setIsProcessing(false);
		}, 2000);
	};

	return (
		<section className="info-table">
			<div className="header">
				<span>STRUCTURE</span>
				<span>VOLUME (cm3)</span>
			</div>
			<div className="data">
				<span>NeuroticCore</span>
				<span>{metrics.neuroticCore}</span>
			</div>
			<div className="data">
				<span>Pretumoral Edema</span>
				<span>{metrics.pretumoralEdema}</span>
			</div>
			<div className="data">
				<span>Enhancing Tumor</span>
				<span>{metrics.enhancingTumor}</span>
			</div>
			<div className="footer">
				<span>TOTAL TUMOUR</span>
				<span>{metrics.totalTumour}</span>
			</div>
		</section>
	);
};

export default InfoTable;
