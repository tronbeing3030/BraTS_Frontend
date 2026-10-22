import React, { useState, useRef } from "react";
import { Menu, Plus, CheckCircle, Package } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";
import Navbar from "./components/Navbar";
import DimToggle from "./components/DimToggle";
import Input from "./components/Input";
import InfoTable from "./components/InfoTable";

// 3D Procedural Brain Simulation Component
function ProceduralBrainMesh({ isProcessing }) {
	const pointsRef = useRef();

	// Create a mathematical point distribution mimicking a hemisphere grid
	const count = 20000;
	const positions = new Float32Array(count * 5);

	for (let i = 0; i < count; i++) {
		const u = Math.random();
		const v = Math.random();
		const theta = u * 2.0 * Math.PI;
		const phi = Math.acos(2.0 * v - 1.0);

		// Distort a sphere into a brain-like shape (elongated oval with folds)
		const radiusX = 2.5 + Math.sin(phi * 8) * 0.15 * Math.cos(theta * 6);
		const radiusY = 2.0 + Math.cos(phi * 4) * 0.1;
		const radiusZ = 1.9 + Math.sin(theta * 2) * 0.08;

		positions[i * 3] = radiusX * Math.sin(phi) * Math.cos(theta);
		positions[i * 3 + 1] = radiusY * Math.sin(phi) * Math.sin(theta);
		positions[i * 3 + 2] = radiusZ * Math.cos(phi);
	}

	// Handle subtle smooth rotation loops on every frame render
	useFrame((state) => {
		if (pointsRef.current) {
			// Rotate faster during simulated inference processing cycles
			pointsRef.current.rotation.y += isProcessing ? 0.04 : 0.005;
			pointsRef.current.rotation.x =
				Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
		}
	});

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					args={[positions, 3]}
				/>
			</bufferGeometry>
			<pointsMaterial
				color={isProcessing ? "#FF5100" : "#00FFEF"}
				size={0.035}
				sizeAttenuation={true}
				transparent={true}
				opacity={0.8}
				blending={THREE.AdditiveBlending}
			/>
		</points>
	);
}

export default function App() {
	const [isProcessing, setIsProcessing] = useState(false);
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
		<div
			style={{
				width: "-webkit-fill-available",
				height: "100vh",
				backgroundColor: "#ffffff",
				color: "#111729",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				fontFamily: "Google Sans",
			}}>
			{/* Top Header */}
			<Navbar></Navbar>

			{/* Viewport Screen Context */}
			<main>
				{/* Live Interactive 3D WebGL Canvas */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "#fff", // Light clinical canvas backdrop style
						zIndex: 1,
					}}>
					<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
						<ambientLight intensity={0.5} />
						<pointLight position={[10, 10, 10]} />

						{/* The 3D Brain Point Cloud Node */}
						<ProceduralBrainMesh isProcessing={isProcessing} />

						{/* Standard drag/zoom mouse listeners */}
						<OrbitControls enableDamping dampingFactor={0.05} />
					</Canvas>

					{isProcessing && (
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								padding: "16px 24px",
								backgroundColor: "#111729f2",
								color: "#00FFEF",
								borderRadius: "6px",
								fontWeight: "bold",
								border: "1px solid #00FFEF",
								pointerEvents: "none",
								zIndex: 30,
							}}>
							Executing U-Net Segmentor Inference...
						</div>
					)}
				</div>

				{/* Volumetric Metrics Floating Panel */}
				<div className="info">
					<InfoTable
						handleDetectAction={handleDetectAction}></InfoTable>
					<Input handleDetectAction={handleDetectAction}></Input>
				</div>
				<DimToggle></DimToggle>
			</main>
		</div>
	);
}
