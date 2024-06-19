import axios from 'axios'

const API_URL = "http://localhost:8800"

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
})

export const apiSolicitacao = async({ url, token, data, method}) => {
try{
    const result = await API(url, {
        method : method || "GET",
        data: data,
        headers: {
            "content-type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
    return result?.data;

} catch(error){
    const err = error.resposta.data;
    console.log(err);
    return { status: err.sucess, message: err.message };
}

}

export const handleFileUpload = async (uploadFile) => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "socialmedia")

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dwvqjzq7/${process.env.REACT_APP_CLOUDINARY}/image/upload/`,
            formData
        )
        return resposta.data.secure_url
    } catch (error) {
        console.log(error)
    }
}

export const pegarPosts = async(token, dispatch, url, data) => {
    try {
        const resposta = await apiSolicitacao({ 
            url:uri||"/posts", 
            token:token, 
            data, 
            method: "POST", 
            data: data||{},})

            dispatch(SetPosts(resposta?.data))
            return
    } catch (error) {
        console.log(error)
    }


}

export const likePost = async({url, token}) => {
    try {
        const resposta = await apiSolicitacao({
            url: uri,
            token: token,
            method: "POST"
        });
        return resposta
    } catch (error) {
        console.log(error);    
    }
}

export const deletePost = async(id, token) => {
    try {
        const resposta = await apiSolicitacao({
            url: "/posts/"+id,
            token: token,
            method: "DELETE"
        })
        return resposta
    } catch (error){
        console.log(error)
    }
}

export const getUserInfo = async (token, id) => {
    try {
        const uri = id === undefined ? "users/get-user": "/users/get-user/"+id;

        const resposta = await apiSolicitacao ({
            url:uri,
            token:token,
            method:"POST",

        })

        if (resposta?.message === "Autenticação falhou") {
            localStorage.removeItem("user");
            window.alert("Sessão de usuário expirada. Faça login de novo")
            window.location.replace("/login")
        }

        return resposta?.user
    } catch (error){
        console.log(error)
    }
}

export const mandarSolicitacaoAmizade = async (token,id) => {
    try {
        const resposta = await apiSolicitacao({
            url: "/users/solicitacao-amizade",
            token: token,
            method: "POST",
            data: { solicitarPara: id },
            })
            return;
    } catch (error) {
        console.log(error)
    }
}

export const verPerfilUser = async (token, id) => {
    try {
        const resposta = await apiSolicitacao({
            url: "/users/ver-perfil",
            token: token,
            method: "POST",
            data: {id},
        })
        return;
    } catch (error) {
        console.log(error)
    }
}