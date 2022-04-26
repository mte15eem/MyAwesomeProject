export default class CropsView {
    constructor(root, { onCropSelect, onCropAdd, onCropEdit, onCloseModal, onCropDelete } = {}) {
        this.root = root;
        this.onCropSelect = onCropSelect;
        this.onCropAdd = onCropAdd;
        this.onCropEdit = onCropEdit;
        this.onCloseModal = onCloseModal;
        this.onCropDelete = onCropDelete;
        this.root.innerHTML = `
        <div class="page_header">Odlarn</div>
        <div class = "crops_sidebar">
            <button class="crops_add" type="button">Ny gröda</button>
            <div class="crops_list"></div>
        </div>

        <!-- Crop Modal -->
        <div id="myModal" class="crop_modal">

        <!-- Modal content -->
        <div class="modal_content">
            <span class="modal_close">&times;</span>
            <input class="crops_swedish_name" type="text">
            <input class="crops_latin_name" type="text">
            <input class="sowing_time" type="text" placeholder="Såtid: ">
            <input class="precultivation" type="text" placeholder="Förkultiveras: Ja/Nej">
            <input class="sprouting_time" type="text" placeholder="Grotid (dagar): ">
            <input class="harvest_time" type="text" placeholder="Skördas: ">
            <span id="modalSave" class="modal_save_changes">Spara</span>
        </div>

        </div>
        `;

        const btnAddCrop = this.root.querySelector(".crops_add");
        const inpSweName = this.root.querySelector(".crops_swedish_name");
        const inpLatName = this.root.querySelector(".crops_latin_name");
        const inpSowing = this.root.querySelector(".sowing_time");
        const inpPrecult = this.root.querySelector(".precultivation");
        const inpSprouting = this.root.querySelector(".sprouting_time");
        const inpHarvest = this.root.querySelector(".harvest_time");

        btnAddCrop.addEventListener("click", () => {
            this.onCropAdd();
        });

        [inpSweName, inpLatName, inpSowing, inpPrecult, inpSprouting, inpHarvest].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedSweName = inpSweName.value.trim();
                const updatedLatName = inpLatName.value.trim();
                const updatedSowing = inpSowing.value.trim();
                const updatedPrecult = inpPrecult.value.trim();
                const updatedSprouting = inpSprouting.value.trim();
                const updatedHarvest = inpHarvest.value.trim();

                this.onCropEdit(updatedSweName, updatedLatName, updatedSowing, updatedPrecult, updatedSprouting, updatedHarvest)
            });
        });


    }

    _createListItemHTML(id, sweName, latName) {
        const MAX_LATNAME_LENGTH = 30;

        return `
            <button class="crops_list_item" data-crop-id = "${id}">
                <div class="crops_small_swedish_name">${sweName}</div>
                <div class="crops_small_latin_name">
                    ${latName.substring(0, MAX_LATNAME_LENGTH)}
                    ${latName.length > MAX_LATNAME_LENGTH ? "..." : ""}
                </div>
                
            </button>

        `;
    }

    _updateCropList(crops) {
        const cropsListContainer = this.root.querySelector(".crops_list");

        //Empty out list
        cropsListContainer.innerHTML = "";

        for (const crop of crops) {
            const html = this._createListItemHTML(crop.id, crop.swedishName, crop.latinName);
            cropsListContainer.insertAdjacentHTML("beforeend", html);
        }

        //Add select/delete events for each list item
        cropsListContainer.querySelectorAll(".crops_list_item").forEach(cropListItem => {
            cropListItem.addEventListener("click", () => {
                this.onCropSelect(cropListItem.dataset.cropId); //cropId kommer från html data-crop-id

                //Open crop modal
                var modal = document.getElementById("myModal");
                modal.style.display = "block";

                var span = document.getElementsByClassName("modal_close")[0];

                //Close modal
                span.onclick = function () {
                    modal.style.display = "none";
                }

                //Save changes
                let btn = document.getElementById("modalSave");
                btn.addEventListener('click', event => {
                    this.onCloseModal();
                    modal.style.display = "none";
                });
            });

            //Delete crop on right click
            cropListItem.addEventListener("contextmenu", () => {
                const doDelete = confirm("Vill du ta bort denna gröda?");

                if (doDelete) {
                    this.onCropDelete(cropListItem.dataset.cropId);
                };
            });
        });
    }


    _updateActiveCrop(crop) {
        this.root.querySelector(".crops_swedish_name").value = crop.swedishName;
        this.root.querySelector(".crops_latin_name").value = crop.latinName;
        this.root.querySelector(".sowing_time").value = crop.sowingTime;
        this.root.querySelector(".precultivation").value = crop.precultivation;
        this.root.querySelector(".sprouting_time").value = crop.sproutingTime;
        this.root.querySelector(".harvest_time").value = crop.harvest;

        this.root.querySelectorAll(".crops_list_item").forEach(cropListItem => {
            cropListItem.classList.remove("crops_list_item_selected");
        });

        this.root.querySelector(`.crops_list_item[data-crop-id="${crop.id}"]`).classList.add("crops_list_item_selected");
    }



}