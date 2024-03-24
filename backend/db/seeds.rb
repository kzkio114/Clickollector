# db/seeds.rb

# Creating sample items
Item.create([
  { name: "光る剣", effect: "攻撃力アップ" },
  { name: "治癒の薬", effect: "HP回復" },
  { name: "速度の靴", effect: "移動速度アップ" }
])

# 属性に基づいて攻撃力を計算するシンプルなロジック
def calculate_attack_power(attribute)
    case attribute
    when "ボロボロ"
      5
    else
      10 # デフォルト値
    end
  end
  
  # 属性に基づいて攻撃力を計算し、Weaponインスタンスをデータベースに保存
  weapon_data = {
    name: "ボロボロの剣",
    attribute: "ボロボロ",
    image_url: "https://example.com/broken_sword.jpg"
  }
  
  attack_power = calculate_attack_power(weapon_data[:attribute])
  
  Weapon.create(
    name: weapon_data[:name],
    attack_power: attack_power,
    image_url: weapon_data[:image_url]
  )
  
  puts "Weapon data has been seeded."