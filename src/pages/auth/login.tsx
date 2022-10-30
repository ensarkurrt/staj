import FormInput from "@/components/FormInput/FormInput";
import { useAuthContext } from "@/context/AuthContext";

import SessionService from "@/services/auth/SessionService";
import { trpc } from "@/utils/trpc";
import styled from "@emotion/styled";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Container, Grid, Link, Link as MuiLink, Stack, Typography } from "@mui/material";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

// 👇 Styled React Route Dom Link Component
export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #3683dc;
  &:hover {
    text-decoration: underline;
    color: #5ea1b6;
  }
`;

// 👇 Styled Material UI Link Component
export const OauthMuiLink = styled(MuiLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6f7;
  border-radius: 1;
  padding: 0.6rem 0;
  column-gap: 1rem;
  text-decoration: none;
  color: #393e45;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
  }
`;

type Inputs = {
  tckn: string;
  password: string;
};

const LoginPage: FC = () => {
  const { actions } = useAuthContext();
  const { login } = actions;

  const router = useRouter();
  const mutation = trpc.useMutation(["auth.login"]);
  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await mutation.mutateAsync({ tckn: data.tckn, password: data.password });
      toast.success(response.message);
      await new SessionService().set(response.user);
      login(response.user);
      setTimeout(async () => {
        await router.push("/");
      }, 2000);
    } catch (error: Error | any) {
      if (error instanceof TRPCClientError) {
        try {
          toast.error(JSON.parse(error.message)[0].message);
        } catch {
          toast.error(error.message);
        }
      }
    }
  };
  return (
    <Container maxWidth={false} sx={{ height: "100vh", backgroundColor: { xs: "#fff", md: "#f4f4f4" } }}>
      <Grid container justifyContent="center" alignItems="center" sx={{ width: "100%", height: "100%" }}>
        <Grid item sx={{ maxWidth: "70rem", width: "100%", backgroundColor: "#fff" }}>
          <FormProvider {...methods}>
            {/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
            <Grid
              container
              sx={{
                boxShadow: { sm: "0 0 5px #ddd" },
                py: "6rem",
                px: "1rem",
              }}
            >
              <Grid
                item
                container
                justifyContent="center"
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: "45rem" },
                  marginInline: "auto",
                }}
              >
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ paddingRight: { sm: "3rem" } }}
                    onSubmit={methods.handleSubmit(onSubmit)}
                  >
                    <Typography variant="h6" component="h1" sx={{ textAlign: "center", mb: "1.5rem" }}>
                      Giriş Yap
                    </Typography>

                    <FormInput
                      type={"text"}
                      label={"Kimlik Numaranız"}
                      name={"tckn"}
                      minLength={5}
                      maxLength={11}
                      required
                    />

                    <FormInput type={"password"} label={"Şifreniz"} name={"password"} minLength={6} required />

                    <LoadingButton
                      loading={methods.formState.isSubmitting}
                      type="submit"
                      variant="contained"
                      sx={{
                        py: "0.8rem",
                        mt: 2,
                        width: "80%",
                        marginInline: "auto",
                      }}
                    >
                      Giriş Yap
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Stack sx={{ mt: "3rem", textAlign: "center" }}>
                  <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
                    <LinkItem href="/auth/register">Hesabınız yok mu? Kayıt Olun!</LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            {/* </form> */}
          </FormProvider>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
