<!DOCTYPE html>
<html dir="ltr" lang="pt-BR">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0; background-color:#e9e3db;">
<div style="background-color:#f7f7f7; width:100%; padding:30px 0 100px 0; height:100%;">
    <div style="margin:0 auto; width:100%; max-width:620px; background-color: #fff;-webkit-border-radius: 20px;
                                            -moz-border-radius: 20px; border-radius: 20px; box-shadow: 0px 0px 5px rgba(0,0,0,0.1)" >
        <div style="padding:20px; text-align:justify; color:#666; line-height:150%; font-family:'Roboto','Helvetica',Arial,sans-serif; font-size:13px;">
            <center>
                <img src="{{ config('app.url_admin') }}/assets/img/logo.png" style="max-width: 150px; width: 100%; margin-bottom: 35px;">
            </center>
            <h1 style="text-align: center; margin:0 0 30px 0; color:#692F93; font-size:18px; font-family:'Roboto','Helvetica',Arial,sans-serif; font-weight:900; text-transform: uppercase;">
                Redefinição de senha
            </h1>
            <p style="text-align: center">
                Uma solicitação de alteração de senha<br />
                foi feita na sua conta da <strong>{{ config('app.company.name')  }}</strong>.
                <br /><br /><br />
                Clique no botão abaixo para confirmar.
            </p>
            <div style="width: 100%; padding: 40px 0; text-align: center;">
                <a href="{{ config('app.url_reset_password') }}/{{ $user->email  }}/{{ $token }}" style="background-color: #692F93; color: #fff; text-decoration: none; padding: 10px 20px;
                                        font-size: 18px; font-weight: bold; -webkit-border-radius: 40px; -moz-border-radius: 40px; border-radius: 40px; margin:0 auto;">
                    ALTERAR MINHA SENHA
                </a>
            </div>
            <center>
                <br><br>
                <p>Caso você não tenha solicitado esta alteração, basta desconsiderar este e-mail.</p>
            </center>
        </div>
    </div>
</div>
</body>
</html>
