import React, {useState} from 'react'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'
import {TbSocial} from 'react-icons/tb'
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
import {TextInput} from '../componentes/index'
import {Link} from "react-router-dom"
import {Loading} from "../componentes/index"
import {BotaoCustom} from "../componentes/index"
import { Background } from '../assets'
import { apiSolicitacao } from '../utils'
import { UsuarioLogin } from '../redux/sliceUsuario'

const Login = () => {
  const {
    register, 
    handleSubmit, 
    formState: {errors},
  } = useForm({
    mode:"onChange"
  })
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  
  const onSubmit = async(data) => {}
      {/*setIsSubmitting(true);

      try {
        const resposta = await apiSolicitacao({
          url:"auth/login",
          data:data,
          method: "POST"
        })

        if (resposta?.status === "failed") {
          setErrMsg(resposta)
        } else {
          setErrMsg("")

          const newData = { token : resposta?.token, ...resposta?.user }
          dispatch(UsuarioLogin(newData))
          window.location.replace("/")
        }
        setIsSubmitting(false)
      } catch(error) {
        console.log(error)
        setIsSubmitting(false)
      }
    };*/}



  return (
    <div className = 'bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className = 'w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl'>
          {/* ESQUERDA */}
          <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
            <div className='w-full flex gap-2 items-center mb-6'>
              <div className= 'p-2 bg-[#065ad8] rounded text-white'>
                <TbSocial />
              </div>
              <span className='text-2xl text-[#065ad8] font-semibold' >
                AlumniConnect
              </span>
            </div>
              <p className='text-ascent-1 text-white font-semibold'>
                Faça login na sua conta 
              </p>
              <span className='text-sm text-white mt-2 text-ascent-2'>
                Bem-vindo de volta ao AlumniConnect
              </span>
            <form className='py-8 flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                nome = "email" placeholder="email@exemplo.com"

                label="Endereço de e-mail"

                type = "email"
                registro = {
                register("email", {
                  required: "O e-mail é obrigatório",
                })}
                styles = "w-full rounded-full"
                labelStyle="ml-2"
                error ={errors.email ? errors.email.message: ""}
              />

              <TextInput
                nome = "senha"
                label="Senha"
                type = "senha" 
                styles = "w-full rounded-full"
                labelStyle="ml-2"
                registro = {
                register("senha", {
                  required: "A senha é obrigatória",
                })}
                error ={errors.senha ? errors.senha.message: ""}
              />
              <Link to="/reset-password"
              className ="text-sm text-right text-blue font-semibold">
                Esqueceu a senha?  
              </Link>

              {errMsg?.message && (
                  <span className={`text-sm ${errMsg?.status === "failed" 
                    ? "text-[#f64949fe]"
                    :"text-[#2ba150fe]"}
                    mt-0.5`}
                  >
                    {errMsg?.message}
                  </span>
              )}
              
              {
                isSubmitting ? (<Loading />) : (
                <BotaoCustom
                  type='submit'
                  containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                  title='Login'
                />
            )}
            </form>

            <p className='text-ascent-2 text-sm text-center'>
            Ainda não tem uma conta?
            <Link
              to='/registro'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Criar Conta
            </Link>
          </p>
          </div>
          {/* DIREITA */}
          <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
            <div className='relative w-full flex items-center justify-center'>
            <img
              src={Background}
              alt = 'Imagem de Fundo'
              className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'
            />

            <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Compartilhe</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction />
              <span className='text-xs font-medium'>Interaja</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection />
              <span className='text-xs font-medium'>Conecte</span>
            </div>
          </div> 
            
          <div className='mt-16 text-center'>
            <p className='text-white text-base'>
              Conecte-se com colegas da faculdade
            </p>
            <span className='text-sm text-white/80'>
              Compartilhe memórias e histórias
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;