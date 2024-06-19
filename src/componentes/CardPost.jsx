import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { SemPerfil } from "../assets";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import BotaoCustom from "./BotaoCustomizado";
import { comentariosPost } from "../assets/dados";

const CardResposta = ({ resposta, user, handleLike }) => {
  return (
    <div className='w-full py-3'>
      <div className='flex gap-3 items-center mb-1'>
        <Link to={"/Perfil/" + resposta?.userId?._id}>
          <img
            src={resposta?.userId?.perfilUrl ?? SemPerfil}
            alt={resposta?.userId?.primeiroNome}
            className='w-10 h-10 rounded-full object-cover'
          />
        </Link>

        <div>
          <Link to={"/Perfil/" + resposta?.userId?._id}>
            <p className='font-medium text-base text-ascent-1'>
              {resposta?.userId?.primeiroNome} {resposta?.userId?.sobrenome}
            </p>
          </Link>
          <span className='text-ascent-2 text-sm'>
            {moment(resposta?.criadoEm).fromNow()}
          </span>
        </div>
      </div>

      <div className='ml-12'>
        <p className='text-ascent-2 '>{resposta?.comentario}</p>
        <div className='mt-2 flex gap-6'>
          <p
            className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'
            onClick={handleLike}
          >
            {resposta?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} color='blue' />
            ) : (
              <BiLike size={20} />
            )}
            {resposta?.likes?.length} Likes
          </p>
        </div>
      </div>
    </div>
  );
};

const ComentarioForm = ({ user, id, respostaEm, getComentario }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full border-b border-[#66666645]'
    >
      <div className='w-full flex items-center gap-2 py-4'>
        <img
          src={user?.perfilUrl ?? SemPerfil}
          alt='User Imagem'
          className='w-10 h-10 rounded-full object-cover'
        />

        <TextInput
          name='comentario'
          styles='w-full rounded-full py-3'
          placeholder={respostaEm ? `Reply @${respostaEm}` : "Comente nesse post"}
          registro={register("comment", {
            required: "Comentário não pode estar vazio",
          })}
          error={errors.comentario ? errors.comentario.message : ""}
        />
      </div>
      {errMsg?.message && (
        <span
          role='alert'
          className={`text-sm ${
            errMsg?.status === "failed"
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
          } mt-0.5`}
        >
          {errMsg?.message}
        </span>
      )}

      <div className='flex items-end justify-end pb-2'>
        {loading ? (
          <Loading />
        ) : (
          <BotaoCustom
            title='Enviar'
            type='submit'
            containerStyles='bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm'
          />
        )}
      </div>
    </form>
  );
};

const CardPost = ({ post, user, deletePost, likePost }) => {
  const [mostraTudo, setMostraTudo] = useState(0);
  const [mostraResposta, setMostraResposta] = useState(0);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [respostaComentario, setRespostaComentario] = useState(0);
  const [mostrarComentario, setMostrarComentario] = useState(0);

  const getComentarios = async () => {
    setRespostaComentario(0);
    setComentarios(comentariosPost);
    setLoading(false);
  };
  const handleLike = async () => {};

  return (
    <div className='mb-2 bg-primary p-4 rounded-xl'>
      <div className='flex gap-3 items-center mb-2'>
        <Link to={"/Perfil/" + post?.userId?._id}>
          <img
            src={post?.userId?.perfilUrl ?? SemPerfil}
            alt={post?.userId?.primeiroNome}
            className='w-14 h-14 object-cover rounded-full'
          />
        </Link>

        <div className='w-full flex justify-between'>
          <div className=''>
            <Link to={"/Perfil/" + post?.userId?._id}>
              <p className='font-medium text-lg text-ascent-1'>
                {post?.userId?.primeiroNome} {post?.userId?.sobrenome}
              </p>
            </Link>
            <span className='text-ascent-2'>{post?.userId?.localizacao}</span>
          </div>

          <span className='text-ascent-2'>
            {moment(post?.criadoEm ?? "2024-15-06").fromNow()}
          </span>
        </div>
      </div>

      <div>
        <p className='text-ascent-2'>
          {mostraTudo === post?._id
            ? post?.descricao
            : post?.descricao.slice(0, 300)}

          {post?.descricao?.length > 301 &&
            (mostraTudo === post?._id ? (
              <span
                className='text-blue ml-2 font-mediu cursor-pointer'
                onClick={() => setMostraTudo(0)}
              >
                Esconder
              </span>
            ) : (
              <span
                className='text-blue ml-2 font-medium cursor-pointer'
                onClick={() => setMostraTudo(post?._id)}
              >
                Ver mais
              </span>
            ))}
        </p>

        {post?.imagem && (
          <img
            src={post?.imagem}
            alt='post imagem'
            className='w-full mt-2 rounded-lg'
          />
        )}
      </div>

      <div
        className='mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
      text-base border-t border-[#66666645]'
      >
        <p className='flex gap-2 items-center text-base cursor-pointer'>
          {post?.likes?.includes(user?._id) ? (
            <BiSolidLike size={20} color='blue' />
          ) : (
            <BiLike size={20} />
          )}
          {post?.likes?.length} Likes
        </p>

        <p
          className='flex gap-2 items-center text-base cursor-pointer'
          onClick={() => {
            setMostrarComentario(mostrarComentario === post._id ? null : post._id);
            getComentarios(post?._id);
          }}
        >
          <BiComment size={20} />
          {post?.comentarios?.length} Comentários
        </p>

        {user?._id === post?.userId?._id && (
          <div
            className='flex gap-1 items-center text-base text-ascent-1 cursor-pointer'
            onClick={() => deletePost(post?._id)}
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Deletar</span>
          </div>
        )}
      </div>

      {/* Comentarios */}
      {mostrarComentario === post?._id && (
        <div className='w-full mt-4 border-t border-[#66666645] pt-4 '>
          <ComentarioForm
            user={user}
            id={post?._id}
            getComments={() => getComentarios(post?._id)}
          />

          {loading ? (
            <Loading />
          ) : comentarios?.length > 0 ? (
            comentarios?.map((comentario) => (
              <div className='w-full py-2' key={comentario?._id}>
                <div className='flex gap-3 items-center mb-1'>
                  <Link to={"/Perfil/" + comentario?.userId?._id}>
                    <img
                      src={comentario?.userId?.perfilUrl ?? SemPerfil}
                      alt={comentario?.userId?.primeiroNome}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                  </Link>
                  <div>
                    <Link to={"/Perfil/" + comentario?.userId?._id}>
                      <p className='font-medium text-base text-ascent-1'>
                        {comentario?.userId?.primeiroNome} {comentario?.userId?.sobrenome}
                      </p>
                    </Link>
                    <span className='text-ascent-2 text-sm'>
                      {moment(comentario?.criadoEm ?? "2024-15-06").fromNow()}
                    </span>
                  </div>
                </div>

                <div className='ml-12'>
                  <p className='text-ascent-2'>{comentario?.comentario}</p>

                  <div className='mt-2 flex gap-6'>
                    <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'>
                      {comentario?.likes?.includes(user?._id) ? (
                        <BiSolidLike size={20} color='blue' />
                      ) : (
                        <BiLike size={20} />
                      )}
                      {comentario?.likes?.length} Likes
                    </p>
                    <span
                      className='text-blue cursor-pointer'
                      onClick={() => setRespostaComentario(comentario?._id)}
                    >
                      Responder
                    </span>
                  </div>

                  {respostaComentario === comentario?._id && (
                    <ComentarioForm
                      user={user}
                      id={comentario?._id}
                      responderEm={comentario?.from}
                      getComentarios={() => getComentarios(post?._id)}
                    />
                  )}
                </div>

                {/* Respostas */}

                <div className='py-2 px-8 mt-6'>
                  {comentario?.resposta?.length > 0 && (
                    <p
                      className='text-base text-ascent-1 cursor-pointer'
                      onClick={() =>
                        setMostraResposta(
                          mostraResposta === comentario?.resposta?._id
                            ? 0
                            : comentario?.resposta?._id
                        )
                      }
                    >
                      Mostrar Respostas ({comentario?.resposta?.length})
                    </p>
                  )}

                  {mostraResposta === comentario?.resposta?._id &&
                    comentario?.resposta?.map((resposta) => (
                      <CardResposta
                        resposta={resposta}
                        user={user}
                        key={resposta?._id}
                        handleLike={() =>
                          handleLike(
                            "/posts/like-comment/" +
                              comentario?._id +
                              "/" +
                              resposta?._id
                          )
                        }
                      />
                    ))}
                </div>
              </div>
            ))
          ) : (
            <span className='flex text-sm py-4 text-ascent-2 text-center'>
              Sem comentários, seja o primeiro a comentar
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CardPost;