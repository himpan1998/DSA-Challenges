<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <title>Document</title>
    <style>
        #element {
            top: 50%;
            position: absolute;
            left: 50%;
            font-size: 30px;
            color: red;
        }
    </style>
</head>
<body>
    <span class="mx-auto" id="element"></span>
</body>
<script src="https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js"></script>
<script>
var typed = new Typed('#element', {
      strings: ['Silence is golden'],
      typeSpeed: 50,
    });
</script>
</html>