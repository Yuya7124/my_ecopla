# Payment
# payment = Payment.create({name: "現金"})
# payment = Payment.create({name: "クレジット決済"})
# payment = Payment.create({name: "口座振込"})

# Purpose
# 親カテゴリー
income, expenditure = Purpose.create([{name: "収入"}, {name: "支出"}, {name: "預入・引出"}, {name: "チャージ"}])

# # 子カテゴリー
# 収入
no_select_in, salary, allowance, other = income.children.create([{name: "---" },{name: "給料"}, {name: "支給"}, {name: "その他"}])
# 支出
no_select_out, food_expenses, public_fees, transportation_expenses, study_expenses, inside_entertainment_expenses, clothing_expenses, beauty_expenses, medical_bills, daily_necessities, trip, outside_entertainment_expenses, charge, others = expenditure.children.create([{name: "---" },{name: "食費"}, {name: "公共料金"}, {name: "交通費"}, {name: "学習費"}, {name: "娯楽費"}, {name: "衣服費"}, {name: "美容費"}, {name: "医療費"}, {name: "日用品"}, {name: "旅行"}, {name: "交際費"}, {name: "その他"}])

# # 孫カテゴリー
# 選択していない
no_select_out.children.create([])
# 食費
food_expenses.children.create([{name: "---" },{name: "朝食"},{name: "昼食"},{name: "夕食"},{name: "夜食"},{name: "お菓子"},{name: "飲料"}])
# 公共料金
public_fees.children.create([{name: "---" },{name: "家賃"},{name: "電気"},{name: "水道"},{name: "ガズ"}])
# 交通費
transportation_expenses.children.create([{name: "---" },{name: "電車"},{name: "バス"},{name: "タクシー"},{name: "新幹線"},{name: "駐車・駐輪"},{name: "ガソリン"},{name: "レンタカー"}])
# 学習費
study_expenses.children.create([{name: "---" },{name: "学費"},{name: "受講料"},{name: "参考書"},{name: "受験料"}])
# 娯楽費
inside_entertainment_expenses.children.create([{name: "---" },{name: "映画"},{name: "CD・DVD"},{name: "書籍・雑誌・マンガ"},{name: "ゲーム"},{name: "課金"},{name: "プラモデル"},{name: "ジグソーパズル"},{name: "おもちゃ"}])
# 衣服費
clothing_expenses.children.create([{name: "---" },{name: "服"},{name: "靴"},{name: "鞄"},{name: "装飾品"},{name: "クリーニング"},{name: "上着"},{name: "下着"}])
# 美容費
beauty_expenses.children.create([{name: "---" },{name: "美容院"},{name: "散髪"},{name: "エステ"},{name: "ソープ・ワックス"},{name: "洗面用具"},{name: "化粧品"}])
# 医療費
medical_bills.children.create([{name: "---" },{name: "病院"},{name: "薬品"},{name: "応急処置"},{name: "定期診察"},{name: "整体"}])
# 日用品
daily_necessities.children.create([{name: "---" },{name: "家具"},{name: "文房具"},{name: "パソコン"},{name: "周辺機器"},{name: "消耗品"},{name: "工具"},{name: "掃除道具"},{name: "家電製品"}])
# 旅行
trip.children.create([{name: "---" },{name: "宿泊費"},{name: "温泉"},{name: "キャンプ"}])
# 交際費
outside_entertainment_expenses.children.create([{name: "---" },{name: "宴会"},{name: "プレゼント"},{name: "お土産"}])