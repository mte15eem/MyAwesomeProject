export default class CropsAPI {
    static getAllCrops() {
        const crops = JSON.parse(localStorage.getItem("crops-to-grow") || "[]");

        return crops.sort((a, b) => a.swedishName > b.swedishName ? 1 : -1)
    }

    static saveCrop(cropToSave) {
        const crops = CropsAPI.getAllCrops();
        const existing = crops.find(crop => crop.id == cropToSave.id);

        if (existing) {
            existing.swedishName = cropToSave.swedishName;
            existing.latinName = cropToSave.latinName;
            existing.sowingTime = cropToSave.sowingTime;
            existing.precultivation = cropToSave.precultivation;
            existing.sproutingTime = cropToSave.sproutingTime;
            existing.harvest = cropToSave.harvest;

        } else {
            cropToSave.id = Math.floor(Math.random() * 1000000);
            crops.push(cropToSave);
        }

        localStorage.setItem("crops-to-grow", JSON.stringify(crops));
    }

    static deleteCrop(id) {
        const crops = CropsAPI.getAllCrops();
        const newCrops = crops.filter(crop => crop.id != id);
        localStorage.setItem("crops-to-grow", JSON.stringify(newCrops));
    }
}