<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>title</title>
</head>
<body>
    <h1>oxゲーム</h1>
    <form action="{{ url('/game/play') }}" method="GET">
        <button type="submit" class="btn btn-primary">開始</button>
    </form>

</body>
</html>