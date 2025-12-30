const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegPath);

const inputFile = "videos/vid5.mov";
const outputFile = "videos/vid5.mp4";

if (!fs.existsSync(inputFile)) {
	console.error(`❌ Archivo no encontrado: ${inputFile}`);
	process.exit(1);
}

const stats = fs.statSync(inputFile);
console.log(
	`🎬 Optimizando ${inputFile} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`
);

ffmpeg(inputFile)
	.outputOptions([
		"-c:v libx264", // Convertir a H.264 (MP4 estándar)
		"-crf 26", // Calidad equilibrada
		"-preset slow", // Mejor compresión
		"-an", // Eliminar audio
		"-movflags +faststart",
	])
	.size("1280x?") // 720p
	.save(outputFile)
	.on("end", () => {
		const newStats = fs.statSync(outputFile);
		const newSize = (newStats.size / 1024 / 1024).toFixed(2);
		const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
		console.log(
			`✅ Convertido a ${outputFile}: ${newSize} MB (Ahorro: ${savings}%)`
		);
	})
	.on("error", (err) => {
		console.error("❌ Error:", err.message);
	});
