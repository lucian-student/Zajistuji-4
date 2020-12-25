import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import Firebase from '../../config/firebase';


export const deleteRecipe = async (recipie_id, setDeleted, source, image_reference) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        cancelToken: source.token,
        url: `http://localhost:5000/recipies/delete_recipie/${recipie_id}`
    })
        .then(res => {
            if (image_reference !== null) {
                const deleteImage = async () => {
                    const storageRef = Firebase.storage().ref();
                    const imgRef = storageRef.child(image_reference);
                    await imgRef.delete().then(async function () {
                        setDeleted(true);
                    }).catch(async function () {
                        console.log('failed to delete image!')
                    });
                }
                deleteImage();
            } else {
                setDeleted(true);
            }
        })
        .catch(err => console.error(err));
};