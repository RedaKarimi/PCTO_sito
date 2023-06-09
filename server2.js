const login = () => {
  toastId.current = toast.loading("Please wait...")
  Axios.post("http://192.168.250.52:3000/login", {
    username: username,
    password: password,
  }).then((response) => {
    console.log(response);
    navigate('/profile', {
      state: {
        account_id: account_id,
        card_id: card_id,
        username: username,
        password: password,
        hashed_password: hashed_password,
        registration_date: registration_date
      }
    })
    toast.update(toastId.current, {
      render: "You have successfuly logged in. You're in your profile now",
      autoClose: 2000,
      type: "success",
      isLoading: false
    });
  }).catch((error) => {
    console.log(error)
  });
};
const register = () => {
  .then((response) => {
  console.log(response);
  navigate('/verification', { state: { email: email } })
  toast.update(toastId.current, {
    render: "Email sent. Please check your inbox and follow the verification instructions.",
    autoClose: 2000,
    type: "success",
    isLoading: false
  });
}).catch((error) => {
  console.log(error.response.status)
  if (error) {
    toast.update(toastId.current, {
      render: "Something went wrong",
      type: "error",
      autoClose: 2000,

      isLoading: false
    })

    if (error.response.status === 404) {
      toast.update(toastId.current, {
        render: "Server is not open",
        type: "error",
        autoClose: 2000,
        isLoading: false
      })
    }

    else if (error.response.status === 409) {
      toast.update(toastId.current, {
        render: "Username/Email already exists",
        type: "error",
        autoClose: 2000,
        isLoading: false
      })

    } else if (error.response.status === 501) {
      toast.update(toastId.current, {
        render: "Error while sending the email",
        type: "error",
        autoClose: 2000,
        isLoading: false
      })
    } else {
      toast.update(toastId.current, {
        render: "Registration Failed",
        type: "error",
        autoClose: 2000,
        isLoading: false
      })
    }
  }
});
  } else {
  console.error('Error: Unable to hash password.');
}
};