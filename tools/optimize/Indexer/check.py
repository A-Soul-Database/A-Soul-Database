import json

with open("main.json","r",encoding="utf-8") as f:
    main=json.loads(f.read())

indexer = ["BV1ey4y1U7Qk", "BV1nX4y1K7ZP", "BV17K4y1W7db", "BV16r4y1T7Kq", "BV1554y147v2", "BV1Np4y1x7rg", "BV1o54y1x7ba", "BV17p4y1x76K", "BV1Sv411W7uz", "BV1Ky4y1m7ja", "BV1Zf4y1r7Re", "BV1tX4y1K7pk", "BV1WT4y1K7BJ", "BV1ft4y1z7zH", "BV1VT4y1P7Tr", "BV1ty4y1p7rm", "BV16v4y1f7mS", "BV1qr4y1K7R5", "BV1Ht4y1B7hj", "BV1Rv411Y7ih", "BV1sh41117ML", "BV1Th41117Ag", "BV1sU4y1x7fb", "BV15X4y1572x", "BV19K4y1D7fZ", "BV1dK4y1D7hd", "BV1NV411q7Yg", "BV1wb4y1R731", "BV1AV411q7D5", "BV18z4y1U723", "BV1Ph411y7gm", "BV1G5411E72K", "BV1XK4y1n7LM", "BV1qv411a7QA", "BV1Ev4y1Z72K", "BV17v411Y7SJ", "BV1Py4y1a7jT", "BV1Vf4y167ji", "BV1tr4y1N7zX", "BV17r4y1A7mo", "BV1hr4y1A7sP", "BV1Kp4y1H7XP", "BV18p4y1H7CQ", "BV1YA411K7ov", "BV1nK4y1J7TT", "BV1Ep4y1H7w1", "BV1KX4y1V7jM", "BV1Ky4y1a79G", "BV1QZ4y1A7yN", "BV13y4y1a753", "BV1xv411h7Wq", "BV1Hh411Q7go", "BV1Ty4y1E7yX", "BV1Kf4y1t7gu", "BV1Tb4y197Se", "BV1ah411Q71o", "BV18V411v7ak", "BV15N411Q76z", "BV1Qv411h7YJ", "BV15v411a7pe", "BV1Py4y1h7MW", "BV12p4y1h7m2", "BV1zK4y1U7tf", "BV1Yi4y1K7eH", "BV1ip4y1h7p1", "BV1jV411e77J", "BV1rZ4y1w7SD", "BV115411P7SG", "BV1aX4y1G7ft", "BV1Df4y1x7Sz", "BV1Df4y1x7Sz", "BV1Ky4y1t7Po", "BV11K4y1T7Uf", "BV1QK4y12755", "BV17y4y1t7ar", "BV1qK4y1T7gW", "BV1HX4y1G79E", "BV1nU4y1Y7WX", "BV1eh411D78N", "BV1fZ4y1F7DU", "BV1Q5411w7pK", "BV1p64y1S7s8", "BV1bA411L7v6", "BV1WK4y1K7G4", "BV1pi4y1A7Fa", "BV1BK411F7Rw", "BV1rp4y187QF", "BV1z54y1b7zE", "BV1mZ4y1c7Ti", "BV1iK411F7vb", "BV1dZ4y1c7hk", "BV1EK411F7Hy", "BV1884y1F7jg", "BV1JV411J7Kr", "BV1ei4y1A7yW", "BV1sB4y1A7pC", "BV1Q54y1L7nu", "BV1sy4y147cG", "BV1gK411c7cM", "BV1zQ4y1Z7M7", "BV1f84y1F7ij", "BV1GK4y1Z7JV", "BV1254y1j7Mv", "BV1xN411f7Qv", "BV1jf4y1W7ry", "BV1Yy4y1p7i6", "BV1XK4y1w76y", "BV1Uq4y1f7jd", "BV1BK4y1d7hv", "BV16541137by", "BV1Vp4y1t764", "BV1B64y1C7zs", "BV1Fo4y1m7ci", "BV1UN411o7L2", "BV1Uh411e75j", "BV1SK4y197fw", "BV1Zq4y177nA", "BV1664y1d7mv", "BV1e5411u7PG", "BV1wU4y1L7Tc", "BV1EN411Z7RU", "BV1eQ4y1R7Q4", "BV1iK4y1G7oQ", "BV1HV41177wn", "BV1gy4y1378u", "BV1pq4y1j7kh", "BV1G5411g7nP", "BV15U4y1L7em", "BV19f4y1b7y6", "BV15A41137QS", "BV19B4y1u7TC", "BV1ay4y137Er", "BV1My4y1u7ji", "BV1yb4y1Z7Jx", "BV1FK4y1377J", "BV1Dq4y1j7gf", "BV1h54y1G7AL", "BV1NB4y1M7rK", "BV11f4y1b7Ck", "BV1LK4y197s4", "BV1z5411K7P2", "BV12y4y1u78P", "BV1LU4y1G7WD", "BV1T5411T7PP", "BV11B4y1M7py", "BV1664y1X7fu", "BV1bq4y1L77P", "BV1xf4y187GX", "BV195411K7ES", "BV1iX4y1A7nF", "BV1Tg41137VY", "BV1cy4y1M74V", "BV1oq4y1L7h4", "BV1QU4y1G7D8", "BV1CB4y1K73d", "BV1Eb4y1y7bY", "BV1H54y1p7mv", "BV1iw411R7ov", "BV1uw411Z7mP", "BV1Z64y197DR", "BV1aU4y1371W", "BV1Zh411h7g4", "BV1Tq4y1x7tb", "BV1Q64y147Dc", "BV1PX4y1A7ga", "BV1Kh411r763", "BV1m54y1n7hZ", "BV1Lw41197AR", "BV1Ty4y1j7Uf", "BV17f4y157Jd", "BV19w41197nP", "BV1q54y1E7ft", "BV1Pf4y1573P", "BV1vU4y1H7Um", "BV1z341167Bt", "BV1Mw411R7At", "BV1F64y1B7j4", "BV1EL411p7Ro", "BV1Tb4y1z7zC", "BV1tQ4y1f7UZ", "BV1eQ4y1f7rN", "BV1k44y117Y1", "BV1iP4y1x7Kt", "BV13M4y1K7Cu", "BV1C3411r7LA", "BV1oo4y1S7iP", "BV1rb4y1U7YL", "BV1fL4y1Y7ie", "BV1f64y1i7Mv", "BV14q4y1S7Tz", "BV1mv411P7Vz"]
for i in range(len(indexer)):
    if indexer[i]!=main[i]["bv"]:
        print("error",i)
