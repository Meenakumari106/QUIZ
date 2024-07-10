document.addEventListener("DOMContentLoaded", function () {
  const forgotPasswordForm = document.getElementById("forgot-password-form");

  if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener("submit", async function (event) {
          event.preventDefault();
          const formData = new FormData(this);
          const emailData = {
              email: formData.get("email"),
          };

          if (validateEmail(emailData)) {
              console.log("Sending password reset request for:", emailData.email);

              try {
                  const response = await fetch("http://example.com/forgot-password", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(emailData),
                  });

                  if (!response.ok) {
                      throw new Error("Failed to send reset password email");
                  }

                  const data = await response.json();
                  console.log("Password reset email sent successfully", data);
                  alert("Password reset email has been sent. Please check your email.");
              } catch (error) {
                  console.error("Error sending reset password email:", error.message);
                  alert("Failed to send reset password email. Please try again.");
              }

              this.reset();
          }
      });
  }

  function validateEmail(emailData) {
      if (!emailData.email) {
          alert("Please enter your email.");
          return false;
      }
      // Simple email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailData.email)) {
          alert("Please enter a valid email address.");
          return false;
      }
      return true;
  }
});
