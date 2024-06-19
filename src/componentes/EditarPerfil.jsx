import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import Loading from "./Loading";
import BotaoCustom from "./BotaoCustomizado";
import { UpdatePerfil } from "../redux/sliceUsuario";

const EditarPerfil = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foto, setFoto] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const onSubmit = async (data) => {};

  const handleClose = () => {
    dispatch(UpdatePerfil(false));
  };
  const handleSelect = (e) => {
    setFoto(e.target.files[0]);
  };

  return (
    <>
      <div className='fixed z-50 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity'>
            <div className='absolute inset-0 bg-[#000] opacity-70'></div>
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
          &#8203;
          <div
            className='inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
            role='dialogo'
            aria-modal='true'
            aria-labelledby='modal-headline'
          >
            <div className='flex justify-between px-6 pt-5 pb-2'>
              <label
                htmlFor='name'
                className='block font-medium text-xl text-ascent-1 text-left'
              >
                Editar Perfil
              </label>

              <button className='text-ascent-1' onClick={handleClose}>
                <MdClose size={22} />
              </button>
            </div>
            <form
              className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                name='primeiroNome'
                label='Primeiro Nome'
                placeholder='Primeiro Nome'
                type='text'
                styles='w-full'
                registro={register("primeiroNome", {
                  required: "Primeiro nome é obrigatório!",
                })}
                error={errors.primeiroNome ? errors.primeiroNome?.message : ""}
              />

              <TextInput
                label='Sobrenome'
                placeholder='Sobrenome'
                type='sobrenome'
                styles='w-full'
                registro={register("sobrenome", {
                  required: "Sobrenome está inválido",
                })}
                error={errors.sobrenome ? errors.sobrenome?.message : ""}
              />

              <TextInput
                name='profissao'
                label='Profissão'
                placeholder='Profissão'
                type='text'
                styles='w-full'
                registro={register("profissao", {
                  required: "Profissão é um requisito!",
                })}
                error={errors.profissao ? errors.profissao?.message : ""}
              />

              <TextInput
                label='location'
                placeholder='Localização'
                type='text'
                styles='w-full'
                registro={register("localizacao", {
                  required: "Localização inexistente",
                })}
                error={errors.localizacao ? errors.localizacao?.message : ""}
              />

              <label
                className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                htmlFor='imgUpload'
              >
                <input
                  type='file'
                  className=''
                  id='imgUpload'
                  onChange={(e) => handleSelect(e)}
                  accept='.jpg, .png, .jpeg'
                />
              </label>

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

              <div className='py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]'>
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <BotaoCustom
                    type='submit'
                    containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                    title='Submit'
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;