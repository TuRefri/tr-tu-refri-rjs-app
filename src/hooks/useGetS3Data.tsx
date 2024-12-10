//@ts-ignore
import awsconfig from '../aws-exports'
export default function useGetS3Data() {
  return {
    awsS3Name: awsconfig.aws_user_files_s3_bucket,
    awsS3Region : awsconfig.aws_user_files_s3_bucket_region
  }
}
