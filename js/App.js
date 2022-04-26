import CropsView from "./CropsView.js";
import CropsAPI from "./CropsAPI.js";

export default class App {
    constructor (root) {
        this.crops = [];
        this.activeCrop = null;
        this.view = new CropsView(root, this._handlers());

        this._refreshCrops();
    }

    _refreshCrops() {
        const crops = CropsAPI.getAllCrops();

        this._setCrops(crops);

        if (crops.length > 0) {
            this._setActiveCrop(crops[0]);
        }

        // if (crops.length > 0 && this.activeCrop) {
        //     this._setActiveCrop(this.activeCrop);
        // }
    }

    _setCrops (crops) {
        this.crops = crops;
        this.view._updateCropList(crops);
        this.view.updateCropPreviewVisibility(crops.length > 0);
    }

    _setActiveCrop (crop) {
        this.activeCrop = crop;
        this.view._updateActiveCrop(crop);
    }

    _handlers() {
        return {
            onCropSelect: cropId => {
                //console.log("Vald gröda: " + cropId);
                const selectedCrop = this.crops.find(crop => crop.id == cropId);
                this._setActiveCrop(selectedCrop);
                //Activate pop-up window here
                //var modal = document.getElementById("myModal");
            },

            onCropAdd: () => {
                const newCrop = {
                    swedishName: "Grödans svenska namn",
                    latinName: "Latinskt namn",
                    sowingTime: "Såtid: ",
                    precultivation: "Förkultiveras: Ja/Nej?",
                    sproutingTime: "Grotid: ",
                    harvest: "Skördas: ",
                };

                CropsAPI.saveCrop(newCrop);
                //this._refreshCrops(newCrop);
                this._refreshCrops();
            },

            onCropEdit: (newSweName, newLatName, newSowing, newPrecult, newSprout, newHarvest) => {
                //console.log(newSweName, newLatName);
                CropsAPI.saveCrop({
                    id: this.activeCrop.id,
                    swedishName: newSweName,
                    latinName: newLatName,
                    sowingTime: newSowing,
                    precultivation: newPrecult,
                    sproutingTime: newSprout,
                    harvest: newHarvest,
                });

                //this._refreshCrops();
            },

            onCloseModal: () => {
                this._refreshCrops();
            },

            onCropDelete: cropId => {
                console.log("Deleted crop: " + cropId);
                CropsAPI.deleteCrop(cropId);
                //this._refreshCrops(this.activeCrop);
                this._refreshCrops();
            },

        };
    }
}