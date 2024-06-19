import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { BotaoCustom, Loading, TextInput } from "../componentes";
import { Background } from "../assets";
import { apiSolicitacao } from "../utils"

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const resposta = await apiSolicitacao({
        url: "/auth/registro",
        data:data,
        method: "POST",
      })
      if (resposta?.status ==="failed"){
        setErrMsg(resposta);
      } else {
        setErrMsg(resposta);
        setTimeout(() => {
          window.location.replace("/login")
        }, 5000)
      }
      setIsSubmitting(false)
    } catch(error){
      console.log(error)
      setIsSubmitting(false)
    }
  };


  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* ESQUERDA */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center '>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
              <TbSocial />
            </div>
            <span className='text-2xl text-[#065ad8] font-semibold'>
              AlumniConnect
            </span>
          </div>

          <p className='text-ascent-1 text-base font-semibold'>
            Crie sua conta
          </p>

          <form
            className='py-8 flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='primeiroNome'
                label='Primeiro Nome'
                placeholder='Primeiro Nome'
                type='nome'
                styles='w-full'
                register={register("primeiroNome", {
                  required: "Primeiro nome é obrigatório",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />

              <TextInput
                label='Sobrenome'
                placeholder='sobrenome'
                type='sobrenome'
                styles='w-full'
                register={register("sobrenome", {
                  required: "Sobrenome inválido",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />
            </div>

            <TextInput
              name='email'
              placeholder='email@exemplo.com'
              label='Endereço de email'
              type='email'
              register={register("email", {
                required: "O e-mail é obrigatório",
              })}
              styles='w-full'
              error={errors.email ? errors.email.message : ""}
            />

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='senha'
                label='Senha'
                placeholder='Senha'
                type='senha'
                styles='w-full'
                register={register("senha", {
                  required: "A senha é obrigatória",
                })}
                error={errors.senha ? errors.senha?.message : ""}
              />

              <TextInput
                label='Confirme sua senha'
                placeholder='Senha'
                type='senha'
                styles='w-full'
                register={register("cSenha", {
                  validate: (value) => {
                    const { senha2 } = getValues();

                    if (senha2 !== value) {
                      return "Senha não corresponde";
                    }
                  },
                })}
                error={
                  errors.cSenha && errors.cSenha.type === "validate"
                    ? errors.cSenha?.message
                    : ""
                }
              />
            </div>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <BotaoCustom
                type='submit'
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                title='Crie sua conta'
              />
            )}
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Já possui uma conta?{" "}
            <Link
              to='/login'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Login
            </Link>
          </p>
        </div>
        {/* DIREITA */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex items-center justify-center'>
            <img
              src={Background}
              alt='Imagem de Fundo'
              className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'
            />

            <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Compartilhe</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection />
              <span className='text-xs font-medium'>Conecte</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction />
              <span className='text-xs font-medium'>Interaja</span>
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

export default Register;