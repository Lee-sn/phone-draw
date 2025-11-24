// api/draw.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), "usedNumbers.json");

    // usedNumbers.json 없으면 생성
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }

    let used = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (used.length >= 10000) {
        return res.status(200).json({ status: "done", number: null });
    }

    let num;
    do {
        num = Math.floor(Math.random() * 10000);
    } while (used.includes(num));

    used.push(num);
    fs.writeFileSync(filePath, JSON.stringify(used));

    res.status(200).json({
        status: "ok",
        number: num.toString().padStart(4, "0"),
    });
}
