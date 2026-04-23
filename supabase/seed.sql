-- Insert dummy data into recipes
INSERT INTO public.recipes (id, title, iddsi_level, base_ingredients, recommended_temp, taste_profile, image_url, instruction)
VALUES 
(
  '4c7e6c40-3b48-4228-b072-a0eb8a379a01',
  '감칠맛 가득 부드러운 연두부찜',
  4,
  ARRAY['연두부', '가쓰오부시 육수', '참기름'],
  'Warm',
  ARRAY['Umami'],
  'https://images.unsplash.com/photo-1548943487-a2e4e43b4850?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '### 조리 방법\n\n1. 연두부를 그릇에 조심스럽게 담습니다.\n2. 가쓰오부시 육수를 2큰술 뿌려줍니다.\n3. 전자레인지에 1분간 따뜻하게 데웁니다.\n4. 참기름을 1방울 떨어뜨려 향을 냅니다.\n\n**숟가락 팁:** 숟가락 뒷면으로 눌렀을 때 쉽게 으깨지는 정도인지 확인하세요.'
),
(
  '4c7e6c40-3b48-4228-b072-a0eb8a379a02',
  '상큼한 레몬 사과 퓨레',
  3,
  ARRAY['사과', '레몬즙', '꿀'],
  'Cold',
  ARRAY['Sour', 'Sweet_bitter_masking'],
  'https://images.unsplash.com/photo-1605296830714-7caca9961db6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '### 조리 방법\n\n1. 껍질을 벗긴 사과를 찜기에 넣고 15분간 푹 찝니다.\n2. 찐 사과를 블렌더에 넣고 완전히 갈아줍니다.\n3. 레몬즙 2방울과 꿀 1티스푼을 섞어줍니다.\n4. 차갑게 식혀서 제공합니다.\n\n**미각 회복 팁:** 신맛이 입맛을 돋우는 데 도움을 줍니다.'
),
(
  '4c7e6c40-3b48-4228-b072-a0eb8a379a03',
  '영양 만점 흰살생선 다짐죽',
  5,
  ARRAY['대구살', '불린 쌀', '당근'],
  'Warm',
  ARRAY['Umami'],
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '### 조리 방법\n\n1. 불린 쌀과 물을 1:6 비율로 넣고 끓입니다.\n2. 대구살과 당근은 아주 잘게 다집니다.\n3. 쌀이 퍼지면 다진 대구살과 당근을 넣고 약불에서 10분 더 끓입니다.\n4. 완전히 식기 전에 따뜻하게 드세요.'
);

-- Insert dummy comments (reviews)
INSERT INTO public.comments (id, user_id, recipe_id, thickener_ratio, custom_tip, tags)
VALUES
(
  uuid_generate_v4(),
  uuid_generate_v4(),
  '4c7e6c40-3b48-4228-b072-a0eb8a379a01',
  '사용안함',
  '금속 숟가락 대신 나무 숟가락을 사용하니 금속맛이 덜 느껴져서 좋았습니다.',
  ARRAY['#따뜻하게', '#감칠맛']
),
(
  uuid_generate_v4(),
  uuid_generate_v4(),
  '4c7e6c40-3b48-4228-b072-a0eb8a379a02',
  '1/2포',
  '사과 퓨레가 약간 묽어서 점도증진제를 반 포 섞었더니 삼키기 딱 좋았어요.',
  ARRAY['#차갑게', '#신맛추가']
);
