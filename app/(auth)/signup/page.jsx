import { signup } from "../login/actions"
export default function SignUPPage() {
  return (
    <div className="SignupContent">
      <h1>SIGNUP</h1>
      <form action={signup}>
        <input type="text" name="firstName" placeholder="Adınız" /> <br />
        <input type="text" name="lastName" placeholder="Soyadınız" /> <br />
        <input type="email" name="email" placeholder="E-posta Adresiniz" /> <br />
        <input type="password" name="password" placeholder="********" /> <br />
        <button>Kayıt Ol</button>
      </form>
    </div>
  )
}