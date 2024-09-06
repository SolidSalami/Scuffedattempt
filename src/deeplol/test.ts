const d = () => fetch("https://ingame-basic-test.deeplol-gg.workers.dev/", {
    "credentials": "omit",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "multipart/form-data; boundary=---------------------------95757394011185700821353190536",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site"
    },
    "referrer": "https://www.deeplol.gg/",
    "body": "-----------------------------95757394011185700821353190536\r\nContent-Disposition: form-data; name=\"puu_id\"\r\n\r\nRXZAAkR0_sqwgbmJapG_DlkmzNqGvadXJHNo8nHpj-1CHidG2bWe7EU0vRf96vRQsiWnk-MzzFQU2g\r\n-----------------------------95757394011185700821353190536\r\nContent-Disposition: form-data; name=\"platform_id\"\r\n\r\nEUW1\r\n-----------------------------95757394011185700821353190536--\r\n",
    "method": "POST",
    "mode": "cors"
});
