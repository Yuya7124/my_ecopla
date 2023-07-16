# Payment
payment = Payment.create({name: "現金"})
payment = Payment.create({name: "クレジット決済"})
payment = Payment.create({name: "口座振込"})

# Purpose
# # 親カテゴリー
# ladies,mens,baby = Category.create([
# {name: "レディース"}, 
# {name: "メンズ"},
# {name: "ベビー・キッズ"}
# ])

# # 子カテゴリー
# tops = ladies.children.create([
# {name: "トップス"},
# {name: "ジャケット/アウター"},
# {name: "パンツ"}
# ])

# # 孫カテゴリー
# tops.children.create([
# {name: "Tシャツ/カットソー(半袖/袖なし)"}, 
# {name: "Tシャツ/カットソー(七分/長袖)"},
# {name: "シャツ/ブラウス(半袖/袖なし)"}
# ])