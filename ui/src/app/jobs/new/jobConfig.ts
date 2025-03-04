import { JobConfig, DatasetConfig } from '@/types';

export const defaultDatasetConfig: DatasetConfig = {
  folder_path: '/path/to/images/folder',
  mask_path: null,
  mask_min_value: 0.1,
  default_caption: '',
  caption_ext: 'txt',
  caption_dropout_rate: 0.05,
  cache_latents_to_disk: false,
  is_reg: false,
  network_weight: 1,
  resolution: [512, 768, 1024],
};

export const defaultJobConfig: JobConfig = {
  job: 'extension',
  config: {
    name: 'my_first_flex_lora_v1',
    process: [
      {
        type: 'ui_trainer',
        training_folder: 'output',
        sqlite_db_path: './aitk_db.db',
        device: 'cuda:0',
        trigger_word: null,
        performance_log_every: 10,
        network: {
          type: 'lora',
          linear: 16,
          linear_alpha: 16,
          lokr_full_rank: true,
          lokr_factor: -1
        },
        save: {
          dtype: 'bf16',
          save_every: 250,
          max_step_saves_to_keep: 4,
          save_format: 'diffusers',
          push_to_hub: false,
        },
        datasets: [
          defaultDatasetConfig
        ],
        train: {
          batch_size: 1,
          bypass_guidance_embedding: true,
          steps: 2000,
          gradient_accumulation: 1,
          train_unet: true,
          train_text_encoder: false,
          gradient_checkpointing: true,
          noise_scheduler: 'flowmatch',
          optimizer: 'adamw8bit',
          timestep_type: 'sigmoid',
          content_or_style: 'balanced',
          optimizer_params: {
            weight_decay: 1e-4
          },
          lr: 0.0001,
          ema_config: {
            use_ema: true,
            ema_decay: 0.99,
          },
          dtype: 'bf16',
          diff_output_preservation: false,
          diff_output_preservation_multiplier: 1.0,
          diff_output_preservation_class: 'person'

        },
        model: {
          name_or_path: 'ostris/Flex.1-alpha',
          is_flux: true,
          quantize: true,
          quantize_te: true
        },
        sample: {
          sampler: 'flowmatch',
          sample_every: 250,
          width: 1024,
          height: 1024,
          prompts: [
            'woman with red hair, playing chess at the park, bomb going off in the background',
            'a woman holding a coffee cup, in a beanie, sitting at a cafe',
            'a horse is a DJ at a night club, fish eye lens, smoke machine, lazer lights, holding a martini',
            'a man showing off his cool new t shirt at the beach, a shark is jumping out of the water in the background',
            'a bear building a log cabin in the snow covered mountains',
            'woman playing the guitar, on stage, singing a song, laser lights, punk rocker',
            'hipster man with a beard, building a chair, in a wood shop',
            'photo of a man, white background, medium shot, modeling clothing, studio lighting, white backdrop',
            "a man holding a sign that says, 'this is a sign'",
            'a bulldog, in a post apocalyptic world, with a shotgun, in a leather jacket, in a desert, with a motorcycle',
          ],
          neg: '',
          seed: 42,
          walk_seed: true,
          guidance_scale: 4,
          sample_steps: 25,
        },
      },
    ],
  },
  meta: {
    name: '[name]',
    version: '1.0',
  },
};
