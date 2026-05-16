<template>
  <div class="registration-form">
    
    
    <Form v-slot="{ errors, meta, values }" :validation-schema="schema">
      <div class="field-group">
        <label>Email:</label>
        <Field 
          name="email" 
          type="email" 
          :class="getFieldClass(meta.touched ? errors.email : null, values.email)" 
        />
        <span class="error-msg">{{ errors.email }}</span>
      </div>

      <div class="field-group">
        <label>Пароль:</label>
        <Field 
          name="password" 
          type="password" 
          :class="getFieldClass(meta.touched ? errors.password : null, values.password)"
        />
        
        <ul class="criteria-list">
          <li :class="checkCriteria(values.password, 8) ? 'valid' : 'invalid'">Длина не менее 8</li>
          <li :class="checkRegex(values.password, /[0-9]/) ? 'valid' : 'invalid'">Цифры</li>
          <li :class="checkRegex(values.password, /[a-z]/) ? 'valid' : 'invalid'">Буквы нижнего регистра</li>
          <li :class="checkRegex(values.password, /[A-Z]/) ? 'valid' : 'invalid'">Буквы верхнего регистра</li>
          <li :class="checkRegex(values.password, /[!@#$%^&*]/) ? 'valid' : 'invalid'">Спецсимволы</li>
        </ul>
      </div>

      <div class="field-group checkbox-row">
        <Field name="agree" type="checkbox" :value="true" id="agree" />
        <label for="agree">I agree with license agreement</label>
      </div>

      <button type="submit" :disabled="!meta.valid || !values.agree">
        Зарегистрироваться
      </button>
    </Form>
  </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Введите email').email('Некорректный email'),
  password: yup.string()
    .required('Введите пароль')
    .min(8)
    .matches(/[0-9]/)
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[!@#$%^&*]/),
  agree: yup.boolean().oneOf([true], 'Необходимо согласие')
});


const checkCriteria = (val, min) => (val ? val.length >= min : false);
const checkRegex = (val, regex) => (val ? regex.test(val) : false);


const getFieldClass = (error, value) => {
  if (!value) return ''; 
  return error ? 'invalid-field' : 'valid-field';
};
</script>

<style scoped>
.registration-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 350px;
}

.field-group { margin-bottom: 15px; display: flex; flex-direction: column; }
.checkbox-row { flex-direction: row; align-items: center; gap: 10px; }

input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; outline: none; }


.invalid-field { border: 2px solid red !important; }
.valid-field { border: 2px solid green !important; }


.criteria-list { list-style: none; padding: 0; margin-top: 10px; font-size: 0.85em; }
.valid { color: green; }
.invalid { color: red; }

.error-msg { color: red; font-size: 0.75em; margin-top: 4px; }

button {
  width: 100%;
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled { background-color: #ccc; cursor: not-allowed; }
</style>
