import * as yup from "yup";

export const validation = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Polje je obavezno")
    .min(3, "Polje mora imati minimum 3 karaktera!")
    .max(20, "Polje mora imati maksimun 20 karaktera!"),
  image_url: yup
    .string()
    .trim()
    .required("Polje je obavezno"),
  content: yup
    .string()
    .trim()
    .required("Polje je obavezno")
    .min(3, "Polje mora imati minimum 3 karaktera!")
    .max(250, "Polje mora imati maksimun 250 karaktera!"),
    author: yup
    .string()
    .trim()
    .required("Polje je obavezno")
    .min(3, "Polje mora imati minimum 3 karaktera!")
    .max(20, "Polje mora imati maksimun 20 karaktera!"),
});
