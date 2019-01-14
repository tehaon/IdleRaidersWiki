export class SaveGameDecoder {

    b = String.fromCharCode;
    c = {};

    compressToBase64(a) {
        if (null == a)
            return "";
        a =this._compress(a, 6, function (a) {
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(a)
        });
        switch (a.length % 4) {
            default:
            case 0:
                return a;
            case 1:
                return a + "\x3d\x3d\x3d";
            case 2:
                return a + "\x3d\x3d";
            case 3:
                return a + "\x3d"
        }
    }

    compressToUTF16(a) {
        return null == a ? "" :this._compress(a, 15, function (a) {
            return String.fromCharCode(a + 32)
        }) + " "
    }

    decompressFromUTF16(a) {
        return null == a ? "" : "" == a ? null :this._decompress(a.length, 16384, function (b) {
            return a.charCodeAt(b) - 32
        })
    }

    compressToUint8Array(a) {
        a = this.compress(a);
        for (var b = new Uint8Array(2 * a.length), c = 0, h = a.length; h > c; c++) {
            var k = a.charCodeAt(c);
            b[2 * c] = k >>> 8;
            b[2 * c + 1] = k % 256
        }
        return b
    }

    decompressFromUint8Array(a) {
        if (null === a || void 0 === a)
            return this.decompress(a);
        for (var c = Array(a.length / 2), g = 0, h = c.length; h > g; g++)
            c[g] = 256 * a[2 * g] + a[2 * g + 1];
        var k = [];
        return c.forEach(function (a) {
            k.push(String.fromCharCode(a))
        }),
        
        this.decompress(k.join(""))
    }

    compressToEncodedURIComponent(a) {
        return null == a ? "" :this._compress(a, 6, function (a) {
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".charAt(a)
        })
    }

    compress(a) {
        return this._compress(a, 16, function (b) {
            return String.fromCharCode(b);
        })
    }

    _compress(a, b, c) {
        if (null == a)
            return "";
        var d, k, m, n = {}, p = {}, r = "", s = "", t = "", u = 2, v = 3, w = 2, x = [], y = 0, z = 0;
        for (m = 0; m < a.length; m += 1)
            if (r = a[m],
                Object.prototype.hasOwnProperty.call(n, r) || (n[r] = v++ ,
                    p[r] = !0),
                s = t + r,
                Object.prototype.hasOwnProperty.call(n, s))
                t = s;
            else {
                if (Object.prototype.hasOwnProperty.call(p, t)) {
                    if (256 > t.charCodeAt(0)) {
                        for (d = 0; w > d; d++)
                            y <<= 1,
                                z == b - 1 ? (z = 0,
                                    x.push(c(y)),
                                    y = 0) : z++;
                        k = t.charCodeAt(0);
                        for (d = 0; 8 > d; d++)
                            y = y << 1 | 1 & k,
                                z == b - 1 ? (z = 0,
                                    x.push(c(y)),
                                    y = 0) : z++ ,
                                k >>= 1
                    } else {
                        k = 1;
                        for (d = 0; w > d; d++)
                            y = y << 1 | k,
                                z == b - 1 ? (z = 0,
                                    x.push(c(y)),
                                    y = 0) : z++ ,
                                k = 0;
                        k = t.charCodeAt(0);
                        for (d = 0; 16 > d; d++)
                            y = y << 1 | 1 & k,
                                z == b - 1 ? (z = 0,
                                    x.push(c(y)),
                                    y = 0) : z++ ,
                                k >>= 1
                    }
                    u--;
                    0 == u && (u = Math.pow(2, w),
                        w++);
                    delete p[t]
                } else
                    for (k = n[t],
                        d = 0; w > d; d++)
                        y = y << 1 | 1 & k,
                            z == b - 1 ? (z = 0,
                                x.push(c(y)),
                                y = 0) : z++ ,
                            k >>= 1;
                u--;
                0 == u && (u = Math.pow(2, w),
                    w++);
                n[s] = v++;
                t = String(r)
            }
        if ("" !== t) {
            if (Object.prototype.hasOwnProperty.call(p, t)) {
                if (256 > t.charCodeAt(0)) {
                    for (d = 0; w > d; d++)
                        y <<= 1,
                            z == b - 1 ? (z = 0,
                                x.push(c(y)),
                                y = 0) : z++;
                    k = t.charCodeAt(0);
                    for (d = 0; 8 > d; d++)
                        y = y << 1 | 1 & k,
                            z == b - 1 ? (z = 0,
                                x.push(c(y)),
                                y = 0) : z++ ,
                            k >>= 1
                } else {
                    k = 1;
                    for (d = 0; w > d; d++)
                        y = y << 1 | k,
                            z == b - 1 ? (z = 0,
                                x.push(c(y)),
                                y = 0) : z++ ,
                            k = 0;
                    k = t.charCodeAt(0);
                    for (d = 0; 16 > d; d++)
                        y = y << 1 | 1 & k,
                            z == b - 1 ? (z = 0,
                                x.push(c(y)),
                                y = 0) : z++ ,
                            k >>= 1
                }
                u--;
                0 == u && (u = Math.pow(2, w),
                    w++);
                delete p[t]
            } else
                for (k = n[t],
                    d = 0; w > d; d++)
                    y = y << 1 | 1 & k,
                        z == b - 1 ? (z = 0,
                            x.push(c(y)),
                            y = 0) : z++ ,
                        k >>= 1;
            u--;
            0 == u && (Math.pow(2, w),
                w++)
        }
        k = 2;
        for (d = 0; w > d; d++)
            y = y << 1 | 1 & k,
                z == b - 1 ? (z = 0,
                    x.push(c(y)),
                    y = 0) : z++ ,
                k >>= 1;
        for (; ;) {
            if (y <<= 1,
                z == b - 1) {
                x.push(c(y));
                break
            }
            z++
        }
        return x.join("")
    }

    decompress(a) {
        return null == a ? "" : "" == a ? null :this._decompress(a.length, 32768, function (b) {
            return a.charCodeAt(b)
        })
    }

    _decompress(a, c, d) {
        var h, k, m, n, p, r, s = [], t = 4, u = 4, v = 3;
        k = "";
        var w = []
            , x = d(0)
            , y = c
            , z = 1;
        for (h = 0; 3 > h; h += 1)
            s[h] = h;
        k = 0;
        n = Math.pow(2, 2);
        for (p = 1; p != n;)
            m = x & y,
                y >>= 1,
                0 == y && (y = c,
                    x = d(z++)),
                k |= (0 < m ? 1 : 0) * p,
                p <<= 1;
        switch (k) {
            case 0:
                k = 0;
                n = Math.pow(2, 8);
                for (p = 1; p != n;)
                    m = x & y,
                        y >>= 1,
                        0 == y && (y = c,
                            x = d(z++)),
                        k |= (0 < m ? 1 : 0) * p,
                        p <<= 1;
                r = String.fromCharCode(k);
                break;
            case 1:
                k = 0;
                n = Math.pow(2, 16);
                for (p = 1; p != n;)
                    m = x & y,
                        y >>= 1,
                        0 == y && (y = c,
                            x = d(z++)),
                        k |= (0 < m ? 1 : 0) * p,
                        p <<= 1;
                r = String.fromCharCode(k);
                break;
            case 2:
                return ""
        }
        h = s[3] = r;
        for (w.push(r); ;) {
            if (z > a)
                return "";
            k = 0;
            n = Math.pow(2, v);
            for (p = 1; p != n;)
                m = x & y,
                    y >>= 1,
                    0 == y && (y = c,
                        x = d(z++)),
                    k |= (0 < m ? 1 : 0) * p,
                    p <<= 1;
            switch (r = k) {
                case 0:
                    k = 0;
                    n = Math.pow(2, 8);
                    for (p = 1; p != n;)
                        m = x & y,
                            y >>= 1,
                            0 == y && (y = c,
                                x = d(z++)),
                            k |= (0 < m ? 1 : 0) * p,
                            p <<= 1;
                    s[u++] = String.fromCharCode(k);
                    r = u - 1;
                    t--;
                    break;
                case 1:
                    k = 0;
                    n = Math.pow(2, 16);
                    for (p = 1; p != n;)
                        m = x & y,
                            y >>= 1,
                            0 == y && (y = c,
                                x = d(z++)),
                            k |= (0 < m ? 1 : 0) * p,
                            p <<= 1;
                    s[u++] = String.fromCharCode(k);
                    r = u - 1;
                    t--;
                    break;
                case 2:
                    return w.join("")
            }
            if (0 == t && (t = Math.pow(2, v),
                v++),
                s[r])
                k = s[r];
            else {
                if (r !== u)
                    return null;
                k = h + h[0]
            }
            w.push(k);
            s[u++] = h + k[0];
            t--;
            h = k;
            0 == t && (t = Math.pow(2, v),
                v++)
        }
    }
}

