


export const REQUEST_FORGET_EMAIL = `<!DOCTYPE html>

<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Recuperação de Senha</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;">
    <tr>
      <td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin:40px auto; border-radius:8px; overflow:hidden;">

      <tr>
        <td style="background:#0f172a; color:#ffffff; padding:20px; text-align:center; font-size:20px; font-weight:bold;">
          Recuperação de Senha
        </td>
      </tr>

      <tr>
        <td style="padding:30px; color:#333; font-size:16px; line-height:1.6;">

          <p>Olá,</p>

          <p>Recebemos um pedido para redefinir a sua senha. Clique no botão abaixo para continuar:</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0;">
            <tr>
              <td align="center">
                <a href="{url}" 
                   style="background:#2563eb; color:#fff; text-decoration:none; padding:14px 28px; border-radius:6px; display:inline-block; font-weight:bold;">
                  Redefinir Senha
                </a>
              </td>
            </tr>
          </table>

          <p>Se você não solicitou esta ação, ignore este e-mail.</p>

          <p style="margin-top:25px;">Este link expira por segurança.</p>

          <p style="margin-top:20px;">Equipe CellShop</p>

        </td>
      </tr>

      <tr>
        <td style="padding:20px; text-align:center; font-size:12px; color:#888;">
          © 2026 CellShop • Não responda este e-mail
        </td>
      </tr>

    </table>

  </td>
</tr>
  </table>
</body>
</html>
`;

export const SUCCESSFUL_RESET_PASSWORD = `<!DOCTYPE html>

<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Senha Redefinida</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;">
    <tr>
      <td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin:40px auto; border-radius:8px; overflow:hidden; text-align:center;">

      <tr>
        <td style="background:#16a34a; color:#ffffff; padding:20px; font-size:20px; font-weight:bold;">
          Sucesso!
        </td>
      </tr>

      <tr>
        <td style="padding:40px 30px;">

          <div style="width:80px; height:80px; margin:0 auto 20px auto; background:#16a34a; border-radius:50%; display:flex; align-items:center; justify-content:center;">
            <span style="color:#fff; font-size:40px;">✔</span>
          </div>

          <h2 style="margin:10px 0; color:#333;">Senha redefinida</h2>

          <p style="color:#555; font-size:16px; line-height:1.5;">
            Sua senha foi alterada com sucesso. Agora você já pode acessar sua conta normalmente.
          </p>

          <p style="margin-top:20px; color:#777; font-size:14px;">
            Se não foi você que realizou esta ação, recomendamos alterar sua senha imediatamente.
          </p>

        </td>
      </tr>

      <tr>
        <td style="padding:20px; font-size:12px; color:#888;">
          © 2026 CellShop • Segurança em primeiro lugar
        </td>
      </tr>

    </table>

  </td>
</tr>
  </table>

</body>
</html>
`;




