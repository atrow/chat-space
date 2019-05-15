FactoryBot.define do
  factory :message do
    body {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    user_id {"1"}
    group_id {"1"}
    association :user
    association :group
  end
end
