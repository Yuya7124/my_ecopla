module PaymentsBalancesHelper
  def edit_link_for_date(date)
    edit_payments_balance_path(date: date)
  end

  #   # ヘルパー
  # ヘルパーメソッドを修正
  def render_child_categories(parent_id, child_id, grandchild_id, index)
    # データベースから与えられた parent_id に対する子カテゴリーオブジェクトを取得
    parent_category = Purpose.find(parent_id)
    child_categories = parent_category.children

    grandchild_categories = []
    if child_id.present?
      selected_child_category = Purpose.find(child_id)
      grandchild_categories = selected_child_category.children
    end

    # プルダウンメニューのHTMLを生成
    html = "
    <td id='edit-child-select-wrap-#{index}' class='c_select_w'>
    <select id='edit-child-select-#{index}' class='c_select' name='payments_balance[payments_balances][#{index}][purpose_id]'>"
    child_categories.each do |child|
      selected = child.id == child_id ? "selected" : ""
      html += "<option value='#{child.id}' #{selected}>#{child.name}</option>"
    end

    html += "</select></td>"

    if grandchild_categories.any?
      html += "
      <td id='edit-grand-child-select-wrap-#{index}' class='c_select_w'>
      <select id='edit-grand-child-select-#{index}' class='c_select' name='payments_balance[payments_balances][#{index}][purpose_id]'>"
      grandchild_categories.each do |grandchild|
        selected = grandchild.id == grandchild_id ? "selected" : ""
        html += "<option value='#{grandchild.id}' #{selected}>#{grandchild.name}</option>"
      end
      html += "</select></td>"
    end

    return html.html_safe
  end
end