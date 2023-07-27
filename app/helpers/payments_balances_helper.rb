module PaymentsBalancesHelper
  def edit_link_for_date(date)
    edit_payments_balance_path(date: date)
  end

  #   # ヘルパー
  # def render_child_categories(form, selected_purpose_id)
  #   # 子カテゴリーのプルダウンを描画する処理
  # end

  # def render_grandchild_categories(form, selected_child_purpose_id)
  #   # 孫カテゴリーのプルダウンを描画する処理
  # end
end