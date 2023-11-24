<template lang="">
    <div class="w-full h-full flex flex-col gap-6 overflow-y-scroll">
        <LayoutArtist :items="popularArtists" title="Popular Artists" link="/artists" :state="state"  />
        <LayoutSection :items="albumPlayLists?.items" title="Albums Playlists" link="/playlists" :state="state" />
        <LayoutSection :items="popularAlbums?.items" title="Popular Albums" link="/playlists" :state="state" />

        <span class="text-gray-400 text-base lg:text-lg lg:font-semibold font-normal mt-1 mb-10 lg:mb-14 pb-2 text-center">&copy; 2023 Muse</span>
    </div>
</template>
<script setup>
const router = useRouter();
const state = ref('pending');
const singlePlayLists = ref(null);
const albumPlayLists = ref(null);
const popularAlbums = ref(null);
const popularArtists = ref(null);

onBeforeMount(() => {
    if (!localStorage.getItem('accessToken')) {
        router.push('/login')
    } 
})

// const getPlayLists = async () => {
//     // const url = 'https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=100';
//     // const options = {
//     //     method: 'GET',
//     //     headers: {
//     //         'X-RapidAPI-Key': '7cfe79fb4cmsha97c9c0ea2a5ac4p1fd173jsn0f3c71c9c278',
//     //         'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//     //     }
//     // };
//      const url = 'https://spotify81.p.rapidapi.com/playlist_tracks?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=100';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '7cfe79fb4cmsha97c9c0ea2a5ac4p1fd173jsn0f3c71c9c278',
//             'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
//         }
//     };

//     try {
//         state.value = 'loading';
//         const response = await fetch(url, options);
//         const result = await response.json();
//         singlePlayLists.value = result.items.filter(playList => {
//             return playList?.track?.album?.album_type === 'single';
//         })
//         albumPlayLists.value = result.items.filter(playList => {
//             return playList?.track?.album?.album_type === 'album';
//         })
//         popularAlbums.value = result.items
//             .filter(item => item?.track?.popularity >= 45)
//             .sort((a, b) => b?.track?.popularity - a?.track?.popularity);
//     } catch (error) {
//         console.error(error);
//     } finally {
//         state.value = 'not-loading';
//     }
// }


const getAlbums = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    state.value = 'loading';
    const res = await fetch('https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    state.value = 'not-loading';
    albumPlayLists.value = {
        items: data?.albums?.[0]?.tracks?.items,
        image: data?.albums?.[0]?.images?.[0]?.url
    };
    popularAlbums.value = {
        items: data?.albums?.[2]?.tracks?.items.sort((a, b) => a.track_number > a.track_number),
        image: data?.albums?.[2]?.images?.[0]?.url
    };
}

const getArtists = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    state.value = 'loading';
    const res = await fetch('https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    state.value = 'not-loading';
    popularArtists.value = data.artists;
    console.log('artists', data.artists);
}


onMounted(() => {
    getAlbums();
    getArtists();

})



</script>
<style lang="">
    
</style>