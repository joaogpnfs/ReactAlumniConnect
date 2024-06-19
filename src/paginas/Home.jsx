import React, {useState} from 'react'
import {useSelector} from 'react-redux';
import { TopBar, Loading, CardPost, EditarPerfil } from '../componentes';
import { CardPerfil } from '../componentes'
import { CardAmigos } from '../componentes'
import { amigos, solicitacoes, posts, sugerir } from '../assets/dados'
import {SemPerfil} from '../assets'
import { Link } from 'react-router-dom'
import {BotaoCustom} from '../componentes'
import {BsPersonFillAdd, BsFiletypeGif} from 'react-icons/bs'
import {BiImages, BiSolidVideo} from 'react-icons/bi'
import {TextInput} from '../componentes'
import {useForm} from 'react-hook-form'


const Home = () => {
  const {user, edit} = useSelector(state=>state.user);
  const [solicitacoesAmizade, setSolicitacoesAmizade] = useState(solicitacoes)
  const [sugerirAmizade, setSugerir] = useState(sugerir)
  const {register, handleSubmit, formState: {errors}} = useForm()
  const handlePostEnviado = async(data)=>{}
  const [errMsg, setErrorMsg] =useState("")
  const [file, setFile] = useState(null)
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);



  return (
    <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
    <TopBar/>
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
      
      {/*Usuario e amigos */}
      <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
        <CardPerfil user = {user}/>
        <CardAmigos amigos = {user?.amigos}/>
      </div>
      
      {/*Feed */}
      <div className='flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-lg'>
        <form 
        onSubmit = {handleSubmit(handlePostEnviado)}
        className='bg-primary px-4 rounded-lg'>
          <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
            <img
            src={user?.perfilUrl ?? SemPerfil}
            alt="Imagem Usuario"
            className='w-14 h-14 rounded-full object-cover' 
            />
            <TextInput
            
            styles='w-full rounded-full py-5'
            placeholder='O que você quer dizer ao mundo?'
            name='descricao'
            register={register("descricao", {
              required:"Escreva algo"
            })}
            error ={errors.descricao ? errors.descricao.message : ''}
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
              
              <div className='flex items-center justify-between py-4'>
                <label
                  htmlFor='imgUpload'
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                >
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='imgUpload'
                    data-max-size='5120'
                    accept='.jpg, .png, .jpeg'
                  />
                  <BiImages />
                  <span>Imagem</span>
                </label>

                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='videoUpload'
                >
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='videoUpload'
                    accept='.mp4, .wav'
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='vgifUpload'
                >
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='vgifUpload'
                    accept='.gif'
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <BotaoCustom
                      type='submit'
                      title='Post'
                      containerStyles='bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm'
                    />
                  )}
                </div>
              </div>
        </form>

        {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <CardPost
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={() => {}}
                  likePost={() => {}}
                />
              ))
            ) : (
          <div className='flex w-full h-full items-center justify-center'>
                <p className='text-lg text-ascent-2'>Nenhum post disponível</p>
          </div>
        )}
      </div>
      
      {/*Sugestões e Grupos de faculdade */}
      <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>

        {/*solicitacoes*/}
        <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
          <div className='flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]'>
            <span>Solicitações de Amizade</span>
            <span>{solicitacoesAmizade?.length}</span>
          </div>
        

        <div className='w-full flex flex-col gap-4 pt-4'> 
          {solicitacoesAmizade?.map(({_id, solicitacaoDe: from})=>(
              <div key={_id}
              className='flex items-center justify-between'
              >
                <Link to={"/Perfil/" + from._id}
                className='w-full flex gap-4 items-center cursor-pointer'>
                  <img
                    src={from?.perfilUrl ?? SemPerfil}
                    alt ={from?.primeiroNome}
                    className='w-10 h-10 object-cover rounded-full'
                  />
                  <div className='flex-1'>
                    <p className='text-base font-medium text-ascent-1'>
                      {from?.primeiroNome} {from?.sobrenome}
                    </p>
                    <span className='text-sm text-ascent-2'>
                      {from?.profissao ?? "Sem Profissão"}
                    </span>
                  </div>
                </Link>
                <div className ='flex gap-1'>
                  <BotaoCustom
                  title="Aceitar"
                  containerStyles='bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full'
                  />
                  <BotaoCustom
                  title='Recusar'
                  containerStyles='border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*sugestoes*/}
        <div className='w-full bg-primary shadow-sm rounded-lg px-5 py-5'>
            <div className = 'flex items-center justify-between text-lg text-ascent-1 border-[#66666645]'>
                <span>Sugestões de Amizade em iCev</span>
            </div>
            <div className='w-full flex flex-col gap-4 pt-4'>
              {
                sugerirAmizade?.map((amigo)=> (
                  <div className='flex items-center justify-between'
                  key={amigo._id}
                  >
                    <Link to={"/Perfil/" + amigo._id}
                    key={amigo?._id}
                    className='w-full flex gap-4 items-center cursor-pointer'
                    >
                      <img
                      src={amigo?.perfilUrl ?? SemPerfil}
                      alt={amigo?.primeiroNome}
                      className='w-10 h-10 object-cover rounded-full'
                      />

                      <div className='flex-1'>
                        <p className='text-base font-medium text-ascent-1'>
                          {amigo?.primeiroNome} {amigo?.sobrenome}
                        </p>
                        <span className='text-sm text-ascent-2'>
                          {amigo?.profissao ?? "Sem Profissão"}
                        </span>
                      </div>
                    </Link>

                    <div className='flex gap-1'>
                      <button
                        className='bg-[#0444a430] text-sm text-white p-1 rounded'
                        onClick={() => {}}
                      >
                          <BsPersonFillAdd size={20} className='text-[#0f52b6]'/>
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
        </div>
      </div>
    </div> 
    {edit && <EditarPerfil/>}
  </div>
  );
}

export default Home;