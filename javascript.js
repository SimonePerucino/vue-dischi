
new Vue({
    el: "#root",
    data: {
        filteredData: [],
        albumList: [],
        genresList: [],
        genreToFilter:"",
    },
    methods: {
        onSelectChange() {
            const newFilteredData = this.albumList.filter((album) =>{
                return album.genre === this.genreToFilter
            })
            this.filteredData = newFilteredData
        },
        createGenresOptions() {
            this.albumList.forEach((album) => {
                if (!this.genresList.includes(album.genre)) {
                    this.genresList.push(album.genre);
                }
            });
        }
    },
    mounted() {

        axios.get("https://flynn.boolean.careers/exercises/api/array/music")
            .then((resp) => {
                const incomingAlbumList = resp.data.response;

                this.albumList.push(...incomingAlbumList);
                this.filteredData.push(...incomingAlbumList)

                this.createGenresOptions();
            });
    },
});